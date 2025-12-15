// @ts-nocheck
// Since we are interacting with a dynamic library (JSZip) and complex XML structures,
// we disable TypeScript checks for this file to allow for more flexible parsing.
import { resizeImage } from './utils';

const EMU_PER_PX = 9525;
const emuToPx = (emu) => Math.round(emu / EMU_PER_PX);

// Simple HTML formatter to improve readability in the editor
function formatHtml(html) {
    var indent = '\n';
    var tab = '  ';
    var i = 0;
    var result = '';
    
    // Split by tags, keeping the tags in the array
    html.split(/(<[^>]*>)/).filter(Boolean).forEach(function(element) {
        const trimmedElement = element.trim();
        if (!trimmedElement) return;

        if (trimmedElement.match(/^<\//)) { // Closing tag
            indent = indent.slice(0, -tab.length);
        }
        
        result += indent + trimmedElement;

        // Opening tag that is not self-closing and not a void element
        if (trimmedElement.match(/^<[^\/]/) && !trimmedElement.match(/\/$/) && !trimmedElement.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/)) { 
            indent += tab;
        }
    });

    return result.replace(/^\n+/, '');
}

class PptxConverter {
    zip;
    themeColors = {};
    updateMessage;
    chartScripts = [];
    chartCount = 0;
    blobMap = {};
    t;
    
    NS = {
        p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
        a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
        r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
        c: 'http://schemas.openxmlformats.org/drawingml/2006/chart'
    };

    constructor(zip, updateMessage, t) {
        this.zip = zip;
        this.updateMessage = updateMessage;
        this.t = t;
    }

    _get(element, tagName, ns) {
        if (!element) return null;
        const children = element.getElementsByTagNameNS(ns, tagName);
        return children.length > 0 ? children[0] : null;
    }
    
    _getAll(element, tagName, ns) {
        if (!element) return [];
        return Array.from(element.getElementsByTagNameNS(ns, tagName));
    }

    async getXml(path) {
        const file = this.zip.file(path);
        if (!file) throw new Error(`${path} not found in zip`);
        const content = await file.async('string');
        const doc = new DOMParser().parseFromString(content, 'application/xml');
        const parserError = doc.querySelector('parsererror');
        if (parserError) {
            console.error(`Error parsing XML for ${path}:`, parserError.textContent);
            throw new Error(`XML parsing error in ${path}`);
        }
        return doc;
    }
    
    _resolveRelPath(target) {
        if (!target) return '';
        // Handles absolute-like paths used by some generators (e.g., starting with '/' or 'ppt/')
        if (target.startsWith('/') || target.startsWith('ppt/')) {
            return target.replace(/^\//, ''); // Remove leading slash if present
        }
        // Handles standard relative paths like '../media/image1.png' which go up from 'ppt/slides/'
        if (target.startsWith('../')) {
             return `ppt/${target.substring(3)}`;
        }
        
        // Handles slide paths from presentation.xml.rels (e.g., 'slides/slide1.xml')
        // which are relative to the 'ppt' directory.
        if (target.startsWith('slides/')) {
            return `ppt/${target}`;
        }
        
        // Fallback for paths relative to a slide directory itself, e.g., 'media/image1.png'
        // without '../'. This resolves to 'ppt/slides/media/image1.png'.
        return `ppt/slides/${target}`;
    }

    async parseTheme() {
        try {
            const themeXml = await this.getXml('ppt/theme/theme1.xml');
            const colorScheme = this._get(themeXml.documentElement, 'clrScheme', this.NS.a);
            if (!colorScheme) return;

            const colors = {};
            for (const colorNode of Array.from(colorScheme.children)) {
                if (colorNode.namespaceURI !== this.NS.a) continue;
                const colorName = colorNode.localName;
                const srgbClr = this._get(colorNode, 'srgbClr', this.NS.a);
                if (srgbClr) {
                    colors[colorName] = `#${srgbClr.getAttribute('val')}`;
                }
            }
            this.themeColors = colors;
        } catch (e) {
            console.warn("Could not parse theme file. Using default colors.", e);
        }
    }

    parseColor(colorNode, defaultColor = 'transparent') {
        if (!colorNode) return defaultColor;
        const srgbClr = this._get(colorNode, 'srgbClr', this.NS.a);
        if (srgbClr) return `#${srgbClr.getAttribute('val')}`;

        const schemeClr = this._get(colorNode, 'schemeClr', this.NS.a);
        if (schemeClr) {
            const schemeVal = schemeClr.getAttribute('val');
            const themeColor = this.themeColors[schemeVal];
            if(themeColor) return themeColor;
        }
        return defaultColor;
    }
    
    parseFill(node) {
        if (!node) return '';
        const solidFill = this._get(node, 'solidFill', this.NS.a);
        if (solidFill) return `background-color: ${this.parseColor(solidFill, 'transparent')};`;
        if (this._get(node, 'noFill', this.NS.a)) return 'background-color: transparent;';
        return '';
    }

    parseTxBody(txBody) {
        if (!txBody) return '';
        let html = '';
        const paragraphs = this._getAll(txBody, 'p', this.NS.a);
        for (const p of paragraphs) {
            const pPr = this._get(p, 'pPr', this.NS.a);
            const textAlign = pPr?.getAttribute('algn') || 'left';
            html += `<div style="text-align: ${textAlign};">`;

            const runs = this._getAll(p, 'r', this.NS.a);
            for (const r of runs) {
                const rPr = this._get(r, 'rPr', this.NS.a);
                const text = this._get(r, 't', this.NS.a)?.textContent || '';
                
                let styles = '';
                if (rPr) {
                    const fontSize = rPr.getAttribute('sz');
                    if (fontSize) styles += `font-size: ${Math.round(parseInt(fontSize, 10) / 100) + 2}px;`;
                    
                    if (rPr.getAttribute('b') === '1') styles += 'font-weight: bold;';
                    if (rPr.getAttribute('i') === '1') styles += 'font-style: italic;';
                    
                    const solidFill = this._get(rPr, 'solidFill', this.NS.a);
                    if (solidFill) styles += `color: ${this.parseColor(solidFill, '#000000')};`;
                }

                html += `<span style="${styles}">${text.replace(/ /g, '&nbsp;')}</span>`;
            }
            html += `</div>`;
        }
        return html;
    }

    async parseShape(shapeNode, slideRels) {
        const spPr = this._get(shapeNode, 'spPr', this.NS.p) || this._get(shapeNode, 'picPr', this.NS.p);
        if (!spPr) return '';
        
        const xfrm = this._get(spPr, 'xfrm', this.NS.a);
        if (!xfrm) return '';

        const off = this._get(xfrm, 'off', this.NS.a);
        const ext = this._get(xfrm, 'ext', this.NS.a);
        if (!off || !ext) return '';

        const x = emuToPx(parseInt(off.getAttribute('x') || '0', 10));
        const y = emuToPx(parseInt(off.getAttribute('y') || '0', 10));
        const w = emuToPx(parseInt(ext.getAttribute('cx') || '0', 10));
        const h = emuToPx(parseInt(ext.getAttribute('cy') || '0', 10));

        let styles = `position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px;`;
        
        styles += this.parseFill(spPr);
        
        const ln = this._get(spPr, 'ln', this.NS.a);
        if (ln) {
            const borderWidth = emuToPx(parseInt(ln.getAttribute('w') || '0', 10));
            if(borderWidth > 0) {
                 const lnFill = this._get(ln, 'solidFill', this.NS.a);
                 styles += `border: ${borderWidth}px solid ${this.parseColor(lnFill, '#000000')};`;
            }
        }
        
        const prstGeom = this._get(spPr, 'prstGeom', this.NS.a);
        if (prstGeom) {
            const shapeType = prstGeom.getAttribute('prst');
            if (shapeType === 'roundRect') styles += 'border-radius: 8px;';
            if (shapeType === 'oval') styles += 'border-radius: 50%;';
        }

        let innerHtml = '';
        
        const blipFill = this._get(shapeNode, 'blipFill', this.NS.p);
        if (blipFill) {
            const blip = this._get(blipFill, 'blip', this.NS.a);
            const rId = blip?.getAttribute('r:embed');
            if (rId && slideRels) {
                const rel = slideRels.querySelector(`Relationship[Id="${rId}"]`);
                if (rel) {
                    const imgPath = this._resolveRelPath(rel.getAttribute('Target'));
                    const imgFile = this.zip.file(imgPath);
                    if (imgFile) {
                        const blobUrl = await this._createImageAssets(imgFile, imgPath);
                        if(blobUrl) {
                           innerHtml = `<img src="${blobUrl}" style="width: 100%; height: 100%; object-fit: cover;" />`;
                           styles += 'overflow: hidden;';
                        }
                    }
                }
            }
        }

        const txBody = this._get(shapeNode, 'txBody', this.NS.p);
        if (txBody) {
            const bodyPr = this._get(txBody, 'bodyPr', this.NS.a);
            let vAlignStyle = '';
            if (bodyPr) {
                const anchor = bodyPr.getAttribute('anchor');
                if (anchor === 'ctr') vAlignStyle = 'display: flex; flex-direction: column; justify-content: center;';
                if (anchor === 'b') vAlignStyle = 'display: flex; flex-direction: column; justify-content: flex-end;';
            }
            
            const textContent = this.parseTxBody(txBody);
            innerHtml += `<div style="height: 100%; ${vAlignStyle}">${textContent}</div>`;
        }

        return `<div style="${styles}">${innerHtml}</div>`;
    }

    async parseGraphicFrame(frameNode, slideRels) {
        const xfrm = this._get(frameNode, 'xfrm', this.NS.p);
        if (!xfrm) return '';
        const off = this._get(xfrm, 'off', this.NS.a);
        const ext = this._get(xfrm, 'ext', this.NS.a);
        const x = emuToPx(parseInt(off?.getAttribute('x') || '0', 10));
        const y = emuToPx(parseInt(off?.getAttribute('y') || '0', 10));
        const w = emuToPx(parseInt(ext?.getAttribute('cx') || '0', 10));
        const h = emuToPx(parseInt(ext?.getAttribute('cy') || '0', 10));
        
        let styles = `position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px;`;

        const graphic = this._get(frameNode, 'graphic', this.NS.a);
        const graphicData = this._get(graphic, 'graphicData', this.NS.a);

        if (graphicData?.getAttribute('uri') === 'http://schemas.openxmlformats.org/drawingml/2006/chart') {
            return this._parseChart(graphicData, styles, slideRels);
        }

        const table = this._get(graphicData, 'tbl', this.NS.a);
        if (table) {
            return this.parseTable(table, styles);
        }

        return `<div style="${styles} border: 1px dashed grey;"><p style="text-align: center; color: grey; font-size: 12px; padding-top: 45%;">지원되지 않는 차트/다이어그램 레이아웃입니다.</p></div>`;
    }
    
    async _parseChart(graphicData, styles, slideRels) {
        this.chartCount++;
        const canvasId = `chart-canvas-${this.chartCount}`;
        
        const chartNode = this._get(graphicData, 'chart', this.NS.c);
        const rId = chartNode?.getAttribute('r:id');
        if (!rId || !slideRels) return `<div style="${styles}">[차트 데이터를 찾을 수 없습니다]</div>`;

        const rel = slideRels.querySelector(`Relationship[Id="${rId}"]`);
        if (!rel) return `<div style="${styles}">[차트 관계를 찾을 수 없습니다]</div>`;

        const chartPath = this._resolveRelPath(rel.getAttribute('Target'));
        const chartXml = await this.getXml(chartPath);

        const plotArea = this._get(chartXml, 'plotArea', this.NS.c);
        if (!plotArea) return `<div style="${styles}">[차트 영역을 찾을 수 없습니다]</div>`;
        
        const chartTypeMap = {
            'barChart': 'bar',
            'bar3DChart': 'bar',
            'lineChart': 'line',
            'line3DChart': 'line',
            'pieChart': 'pie',
            'pie3DChart': 'pie',
            'doughnutChart': 'doughnut',
            'areaChart': 'line'
        };
        
        let chartTypeNode = null;
        let chartJsType = null;

        for (const child of Array.from(plotArea.children)) {
            if (child.namespaceURI === this.NS.c && chartTypeMap[child.localName]) {
                chartTypeNode = child;
                chartJsType = chartTypeMap[child.localName];
                break;
            }
        }

        if (!chartTypeNode) {
            return `<div style="${styles} border: 1px dashed grey;"><p style="text-align: center; color: grey; font-size: 12px; padding-top: 45%;">지원되지 않는 차트 종류입니다.</p></div>`;
        }
        
        const chartData = { labels: [], datasets: [] };
        const series = this._getAll(chartTypeNode, 'ser', this.NS.c);

        if (series.length === 0) return `<div style="${styles}">[차트 시리즈 데이터 없음]</div>`;

        const cat = this._get(series[0], 'cat', this.NS.c);
        const catValuesNode = this._get(cat, 'strRef', this.NS.c) || this._get(cat, 'numRef', this.NS.c);
        if (catValuesNode) {
            const pts = this._getAll(catValuesNode, 'pt', this.NS.c);
            chartData.labels = pts.map(pt => this._get(pt, 'v', this.NS.c)?.textContent || '');
        }

        series.forEach(ser => {
            const seriesLabel = this._get(this._get(ser, 'tx', this.NS.c), 'v', this.NS.c)?.textContent || 'Series';
            const val = this._get(ser, 'val', this.NS.c);
            const numValuesNode = this._get(val, 'numRef', this.NS.c);
            if (numValuesNode) {
                const pts = this._getAll(numValuesNode, 'pt', this.NS.c);
                const values = pts.map(pt => parseFloat(this._get(pt, 'v', this.NS.c)?.textContent || '0'));
                
                const spPr = this._get(ser, 'spPr', this.NS.c);
                const solidFill = this._get(spPr, 'solidFill', this.NS.a);
                const backgroundColor = this.parseColor(solidFill, '#4c6ef5');

                chartData.datasets.push({ label: seriesLabel, data: values, backgroundColor });
            }
        });
        
        if (chartJsType === 'line' && chartTypeNode.localName === 'areaChart') {
            chartData.datasets.forEach(dataset => {
                dataset.fill = 'start';
            });
        }
        
        const options = { responsive: true, maintainAspectRatio: false };

        const chartScript = `new Chart(document.getElementById('${canvasId}'), { type: '${chartJsType}', data: ${JSON.stringify(chartData)}, options: ${JSON.stringify(options)} });`;
        this.chartScripts.push(chartScript);
        
        return `<div class="chart-container" style="${styles}"><canvas id="${canvasId}"></canvas></div>`;
    }

    parseTable(tableNode, containerStyles) {
        let tableHtml = `<table style="width: 100%; height: 100%; border-collapse: collapse;">`;
        const trs = this._getAll(tableNode, 'tr', this.NS.a);
        for (const tr of trs) {
            tableHtml += '<tr>';
            const tcs = this._getAll(tr, 'tc', this.NS.a);
            for (const tc of tcs) {
                const txBody = this._get(tc, 'txBody', this.NS.a);
                const tcPr = this._get(tc, 'tcPr', this.NS.a);
                let cellStyle = 'padding: 8px; border: 1px solid #ccc;';
                if(tcPr) {
                    cellStyle += this.parseFill(tcPr);
                }
                const cellText = this.parseTxBody(txBody);
                tableHtml += `<td style="${cellStyle}">${cellText}</td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        return `<div style="${containerStyles}">${tableHtml}</div>`;
    }
    
    async parseBackground(slideXml, slideRels) {
        const cSld = this._get(slideXml.documentElement, 'cSld', this.NS.p);
        const bg = this._get(cSld, 'bg', this.NS.p);
        if (!bg) return '';

        const bgPr = this._get(bg, 'bgPr', this.NS.p);
        if (!bgPr) return '';

        const solidFill = this._get(bgPr, 'solidFill', this.NS.a);
        if (solidFill) {
            const color = this.parseColor(solidFill, 'transparent');
            return `background-color: ${color};`;
        }

        const blipFill = this._get(bgPr, 'blipFill', this.NS.a);
        if (blipFill) {
            const blip = this._get(blipFill, 'blip', this.NS.a);
            const rId = blip?.getAttribute('r:embed');
            if (rId && slideRels) {
                const rel = slideRels.querySelector(`Relationship[Id="${rId}"]`);
                if (rel) {
                    const imgPath = this._resolveRelPath(rel.getAttribute('Target'));
                    const imgFile = this.zip.file(imgPath);
                    if (imgFile) {
                        const blobUrl = await this._createImageAssets(imgFile, imgPath);
                        if(blobUrl) {
                            return `background-image: url(${blobUrl}); background-size: cover;`;
                        }
                    }
                }
            }
        }
        return '';
    }

    async _createImageAssets(imgFile, imgPath) {
        try {
            const mimeType = this.getMimeType(imgPath);
            const blob = await imgFile.async('blob');
            const file = new File([blob], imgFile.name, { type: mimeType });
            
            const blobUrl = URL.createObjectURL(file);
            const base64Url = await resizeImage(file);
            
            this.blobMap[blobUrl] = base64Url;
            return blobUrl;
        } catch(e) {
            console.error("Failed to process image from PPTX", e);
            return '';
        }
    }

    getMimeType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        switch (ext) {
            case 'png': return 'image/png';
            case 'jpg':
            case 'jpeg': return 'image/jpeg';
            case 'gif': return 'image/gif';
            case 'svg': return 'image/svg+xml';
            default: return 'application/octet-stream';
        }
    }

    async convert() {
        await this.parseTheme();

        const presentationXml = await this.getXml('ppt/presentation.xml');
        const sldSz = this._get(presentationXml.documentElement, 'sldSz', this.NS.p);
        const slideWidth = emuToPx(parseInt(sldSz?.getAttribute('cx') || '12192000', 10)); // Default 16:9
        const slideHeight = emuToPx(parseInt(sldSz?.getAttribute('cy') || '6858000', 10));

        const sldIdLst = this._get(presentationXml.documentElement, 'sldIdLst', this.NS.p);
        const slideIds = this._getAll(sldIdLst, 'sldId', this.NS.p).map(el => el.getAttribute('r:id'));

        const presRelsXml = await this.getXml('ppt/_rels/presentation.xml.rels');
        
        let allSlidesHtml = '';
        for (const [index, rId] of slideIds.entries()) {
            try {
                this.updateMessage(this.t('pptxConverter.slideProcess', { current: index + 1, total: slideIds.length }));
                const slideRel = presRelsXml.querySelector(`Relationship[Id="${rId}"]`);
                if (!slideRel) continue;
                const slidePath = this._resolveRelPath(slideRel.getAttribute('Target'));
                const slideXml = await this.getXml(slidePath);

                const slideRelsPath = `ppt/slides/_rels/${slidePath.split('/').pop()}.rels`;
                let slideRelsXml = null;
                if (this.zip.file(slideRelsPath)) {
                    slideRelsXml = await this.getXml(slideRelsPath);
                }
                
                const backgroundStyle = await this.parseBackground(slideXml, slideRelsXml);
                
                let slideContentHtml = '';
                const spTree = this._get(slideXml.documentElement, 'spTree', this.NS.p);
                if (spTree) {
                    for (const childNode of Array.from(spTree.children)) {
                        const tagName = childNode.localName;
                        if (tagName === 'sp' || tagName === 'pic') {
                            slideContentHtml += await this.parseShape(childNode, slideRelsXml);
                        } else if (tagName === 'graphicFrame') {
                            slideContentHtml += await this.parseGraphicFrame(childNode, slideRelsXml);
                        }
                    }
                }

                allSlidesHtml += `<div class="slide-item" style="width: ${slideWidth}px; height: ${slideHeight}px; ${backgroundStyle}">${slideContentHtml}</div>`;

            } catch (e) {
                console.error(`슬라이드 rId=${rId} 처리 중 오류 발생:`, e);
                allSlidesHtml += `<div class="slide-item" style="width: ${slideWidth}px; height: ${slideHeight}px; background-color: #FFF0F0; border: 2px solid #D9534F;"><p style="text-align:center; padding-top: 45%; color: #D9534F; font-weight: bold;">슬라이드 ${index + 1} 변환에 실패했습니다.</p></div>`;
            }
        }
        
        let finalHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <style>
        body { 
            margin: 0; 
        }
        .slide-container {
            /* This is now the main wrapper for all slides */
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding: 2rem 0;
        }
        .slide-item {
            /* This is for each individual slide */
            position: relative;
            overflow: hidden;
            background-color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            flex-shrink: 0;
        }
    </style>
</head>
<body>
    <div class="slide-container">
        ${allSlidesHtml}
    </div>`;

        if (this.chartScripts.length > 0) {
            const scriptBlock = `
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        ${this.chartScripts.join('\n')}
                    });
                <\/script>
            `;
            finalHtml += scriptBlock;
        }

        finalHtml += '</body></html>';
        return finalHtml;
    }
}

export async function convertPptxToHtml(file, updateMessage, t) {
    const JSZip = (window as any).JSZip;
    if (!JSZip) throw new Error("JSZip 라이브러리가 로드되지 않았습니다.");

    const zip = await JSZip.loadAsync(file);
    const converter = new PptxConverter(zip, updateMessage, t);
    const html = await converter.convert();
    return { html: formatHtml(html), blobMap: converter.blobMap };
}