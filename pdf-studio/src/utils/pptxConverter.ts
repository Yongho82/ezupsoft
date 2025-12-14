// @ts-nocheck
// This file is adapted from a robust PPTX parsing logic.
// TypeScript checks are disabled to allow for flexible and rapid implementation
// of the complex XML parsing required for PPTX files.

declare const JSZip: any;
declare const Chart: any;

const EMU_PER_PX = 9525;
const emuToPx = (emu) => Math.round(emu / EMU_PER_PX);

class PptxConverter {
    zip;
    themeColors = {};

    NS = {
        p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
        a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
        r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
        c: 'http://schemas.openxmlformats.org/drawingml/2006/chart',
        mc: 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    };

    constructor(zip) {
        this.zip = zip;
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
        if (!file) {
            console.error(`${path} not found in zip`);
            return null; // Return null instead of throwing error for optional files
        }
        const content = await file.async('string');
        const doc = new DOMParser().parseFromString(content, 'application/xml');
        const parserError = doc.querySelector('parsererror');
        if (parserError) {
            console.error(`Error parsing XML for ${path}:`, parserError.textContent);
            throw new Error(`XML parsing error in ${path}`);
        }
        return doc;
    }
    
    _resolveRelPath(base, target) {
        // Handle absolute paths in target (from zip root, e.g., /ppt/media/image1.png)
        if (target.startsWith('/')) {
            return target.substring(1);
        }

        const baseParts = base.split('/');
        baseParts.pop(); // remove filename to get the base directory

        const targetParts = target.split('/');

        for (const part of targetParts) {
            if (part === '..') {
                if (baseParts.length > 0) {
                    baseParts.pop();
                }
            } else if (part !== '.' && part !== '') {
                // Ignore '.' and empty parts (from '//')
                baseParts.push(part);
            }
        }
        return baseParts.join('/');
    }

    async parseTheme() {
        try {
            const themeXml = await this.getXml('ppt/theme/theme1.xml');
            if (!themeXml) return;
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
            return this.themeColors[schemeVal] || defaultColor;
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
            html += `<div style="text-align: ${textAlign}; position: relative; min-height: 1em;">`; // min-height for empty lines

            const runs = this._getAll(p, 'r', this.NS.a);
            if (runs.length === 0) { // Handle empty paragraphs
                html += '&nbsp;';
            } else {
                for (const r of runs) {
                    const rPr = this._get(r, 'rPr', this.NS.a);
                    const text = this._get(r, 't', this.NS.a)?.textContent || '';
                    
                    let styles = '';
                    if (rPr) {
                        const fontSize = rPr.getAttribute('sz');
                        if (fontSize) styles += `font-size: ${Math.round(parseInt(fontSize, 10) / 100)}px;`;
                        if (rPr.getAttribute('b') === '1') styles += 'font-weight: bold;';
                        if (rPr.getAttribute('i') === '1') styles += 'font-style: italic;';
                        
                        const solidFill = this._get(rPr, 'solidFill', this.NS.a);
                        if (solidFill) styles += `color: ${this.parseColor(solidFill, '#000000')};`;
                    }

                    html += `<span style="${styles}">${text.replace(/ /g, '&nbsp;')}</span>`;
                }
            }
            html += `</div>`;
        }
        return html;
    }

    async parseShape(shapeNode, slideRels, slidePath, parentX = 0, parentY = 0) {
        const spPr = this._get(shapeNode, 'spPr', this.NS.p) || this._get(shapeNode, 'picPr', this.NS.p);
        if (!spPr) return '';
        
        const xfrm = this._get(spPr, 'xfrm', this.NS.a);
        if (!xfrm) return '';

        const off = this._get(xfrm, 'off', this.NS.a);
        const ext = this._get(xfrm, 'ext', this.NS.a);
        if (!off || !ext) return '';

        const x = emuToPx(off.getAttribute('x'));
        const y = emuToPx(off.getAttribute('y'));
        const w = emuToPx(ext.getAttribute('cx'));
        const h = emuToPx(ext.getAttribute('cy'));

        const finalX = parentX + x;
        const finalY = parentY + y;

        let styles = `position: absolute; left: ${finalX}px; top: ${finalY}px; width: ${w}px; height: ${h}px;`;
        
        styles += this.parseFill(spPr);
        
        const ln = this._get(spPr, 'ln', this.NS.a);
        if (ln) {
            const borderWidth = emuToPx(ln.getAttribute('w') || '0');
            if(borderWidth > 0) {
                 const lnFill = this._get(ln, 'solidFill', this.NS.a);
                 styles += `border: ${borderWidth}px solid ${this.parseColor(lnFill, '#000000')}; box-sizing: border-box;`;
            }
        }
        
        const prstGeom = this._get(spPr, 'prstGeom', this.NS.a);
        if (prstGeom) {
            const shapeType = prstGeom.getAttribute('prst');
            if (shapeType === 'roundRect') styles += 'border-radius: 8px;';
            if (shapeType === 'oval') styles += 'border-radius: 50%;';
        }

        let innerHtml = '';
        
        const blipFill = this._get(shapeNode, 'blipFill', this.NS.p) || this._get(shapeNode, 'blipFill', this.NS.p);
        if (blipFill) {
            const blip = this._get(blipFill, 'blip', this.NS.a);
            const rId = blip?.getAttribute('r:embed');
            if (rId && slideRels) {
                const rel = slideRels.querySelector(`Relationship[Id="${rId}"]`);
                if (rel) {
                    const imgPath = this._resolveRelPath(slidePath, rel.getAttribute('Target'));
                    const imgFile = this.zip.file(imgPath);
                    if (imgFile) {
                        const blobUrl = await this.createImageBlobUrl(imgFile);
                        if(blobUrl) {
                           innerHtml = `<img src="${blobUrl}" style="width: 100%; height: 100%; object-fit: fill;" alt="presentation image"/>`;
                           styles += 'overflow: hidden;';
                        }
                    }
                }
            }
        }

        const txBody = this._get(shapeNode, 'txBody', this.NS.p);
        if (txBody) {
             const bodyPr = this._get(txBody, 'bodyPr', this.NS.a);
             let vAlignStyle = 'padding: 5px;';
             if (bodyPr) {
                 const anchor = bodyPr.getAttribute('anchor');
                 if (anchor === 'ctr') vAlignStyle += 'display: flex; flex-direction: column; justify-content: center;';
                 if (anchor === 'b') vAlignStyle += 'display: flex; flex-direction: column; justify-content: flex-end;';
             }
            const textContent = this.parseTxBody(txBody);
            innerHtml += `<div style="height: 100%; box-sizing: border-box; ${vAlignStyle}">${textContent}</div>`;
        }

        return `<div style="${styles}">${innerHtml}</div>`;
    }
    
    async parseGraphicFrame(frameNode, slideRels, slidePath, parentX = 0, parentY = 0) {
        const xfrm = this._get(frameNode, 'xfrm', this.NS.p);
        if (!xfrm) return '';
        const off = this._get(xfrm, 'off', this.NS.a);
        const ext = this._get(xfrm, 'ext', this.NS.a);
        const x = emuToPx(off?.getAttribute('x') || '0');
        const y = emuToPx(off?.getAttribute('y') || '0');
        const w = emuToPx(ext?.getAttribute('cx') || '0');
        const h = emuToPx(ext?.getAttribute('cy') || '0');
        
        const finalX = parentX + x;
        const finalY = parentY + y;
        
        let styles = `position: absolute; left: ${finalX}px; top: ${finalY}px; width: ${w}px; height: ${h}px;`;

        const graphic = this._get(frameNode, 'graphic', this.NS.a);
        const graphicData = this._get(graphic, 'graphicData', this.NS.a);
        
        const uri = graphicData?.getAttribute('uri');

        if (uri === 'http://schemas.openxmlformats.org/drawingml/2006/chart') {
            return await this._parseChart(graphicData, styles, slideRels, slidePath);
        }

        const table = this._get(graphicData, 'tbl', this.NS.a);
        if (table) {
            return this.parseTable(table, styles);
        }

        return `<div style="${styles} border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #888; box-sizing: border-box;">[Unsupported Graphic]</div>`;
    }

    async parseGroupShape(groupNode, slideRels, slidePath, parentX = 0, parentY = 0) {
        const grpSpPr = this._get(groupNode, 'grpSpPr', this.NS.p);
        if (!grpSpPr) return '';

        const xfrm = this._get(grpSpPr, 'xfrm', this.NS.a);
        if (!xfrm) return '';

        const off = this._get(xfrm, 'off', this.NS.a);
        const groupX = emuToPx(off?.getAttribute('x') || '0');
        const groupY = emuToPx(off?.getAttribute('y') || '0');
        
        const currentGroupX = parentX + groupX;
        const currentGroupY = parentY + groupY;

        let groupContentHtml = '';

        for (const childNode of Array.from(groupNode.children)) {
            if (childNode.namespaceURI !== this.NS.p) continue;
            
            const tagName = childNode.localName;
            
            if (tagName === 'sp' || tagName === 'pic') {
                groupContentHtml += await this.parseShape(childNode, slideRels, slidePath, currentGroupX, currentGroupY);
            } else if (tagName === 'graphicFrame') {
                groupContentHtml += await this.parseGraphicFrame(childNode, slideRels, slidePath, currentGroupX, currentGroupY);
            } else if (tagName === 'grpSp') { // Recursive call for nested groups
                groupContentHtml += await this.parseGroupShape(childNode, slideRels, slidePath, currentGroupX, currentGroupY);
            }
        }
        
        return groupContentHtml;
    }
    
    async _parseChart(graphicData, styles, slideRels, slidePath) {
        const chartNode = this._get(graphicData, 'chart', this.NS.c);
        const rId = chartNode?.getAttribute('r:id');

        if (!rId || !slideRels) {
            return `<div style="${styles} border: 1px dashed #ccc; box-sizing: border-box; text-align: center; color: #888;">[Chart Data Not Found]</div>`;
        }

        const rel = slideRels.querySelector(`Relationship[Id="${rId}"]`);
        if (!rel) {
            return `<div style="${styles} border: 1px dashed #ccc; box-sizing: border-box; text-align: center; color: #888;">[Chart Relationship Not Found]</div>`;
        }

        const chartPath = this._resolveRelPath(slidePath, rel.getAttribute('Target'));
        const chartXml = await this.getXml(chartPath);
        if (!chartXml) {
             return `<div style="${styles} border: 1px dashed #ccc; box-sizing: border-box; text-align: center; color: #888;">[Chart XML Not Found]</div>`;
        }
        
        // Exclusively use the fallback image (the "screenshot")
        try {
            const alternateContent = this._get(chartXml.documentElement, 'AlternateContent', this.NS.mc);
            let blip = null;

            // Look for a blip element inside the Fallback content first. This is the most reliable method.
            if (alternateContent) {
                const fallback = this._get(alternateContent, 'Fallback', this.NS.mc);
                if (fallback) {
                    // Find the first descendant blip element, regardless of its parent (p:pic, p:sp, etc.)
                    blip = this._get(fallback, 'blip', this.NS.a);
                }
            }

            // If not found, check inside userShapes (another common location for cached images)
            if (!blip) {
                const userShapes = this._get(chartXml.documentElement, 'userShapes', this.NS.c);
                if (userShapes) {
                    blip = this._get(userShapes, 'blip', this.NS.a);
                }
            }
            
            if (blip) {
                const embedId = blip.getAttribute('r:embed');
                
                // First, try to find the image in the chart's own relationships file
                const chartRelsPath = this._resolveRelPath(chartPath, `_rels/${chartPath.split('/').pop()}.rels`);
                const chartRelsXml = await this.getXml(chartRelsPath);
                
                let imgRel = null;
                let basePathForImg = '';

                if (embedId && chartRelsXml) {
                    imgRel = chartRelsXml.querySelector(`Relationship[Id="${embedId}"]`);
                    if (imgRel) {
                        basePathForImg = chartPath;
                    }
                }
                
                // If not found, fall back to checking the slide's relationships file
                if (!imgRel && embedId && slideRels) {
                    imgRel = slideRels.querySelector(`Relationship[Id="${embedId}"]`);
                    if (imgRel) {
                        basePathForImg = slidePath;
                    }
                }

                if (imgRel) {
                    const imgPath = this._resolveRelPath(basePathForImg, imgRel.getAttribute('Target'));
                    const imgFile = this.zip.file(imgPath);
                    if (imgFile) {
                        const blobUrl = await this.createImageBlobUrl(imgFile);
                        if (blobUrl) {
                            return `<div style="${styles}"><img src="${blobUrl}" style="width: 100%; height: 100%; object-fit: contain;" alt="Chart image"/></div>`;
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error while trying to extract chart fallback image:", e);
        }

        // If screenshot method fails for any reason, show a clear placeholder.
        return `<div style="${styles} border: 1px dashed #ccc; box-sizing: border-box; text-align: center; color: #888; display: flex; align-items: center; justify-content: center; font-size: 12px; padding: 5px;">[차트 미리보기 이미지를 찾을 수 없습니다]</div>`;
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

    async parseBackground(slideXml, slideRels, slidePath) {
        const bg = this._get(this._get(slideXml.documentElement, 'cSld', this.NS.p), 'bg', this.NS.p);
        if (!bg) return 'background-color: #FFFFFF;';

        const bgPr = this._get(bg, 'bgPr', this.NS.p);
        if (!bgPr) return 'background-color: #FFFFFF;';

        const solidFill = this._get(bgPr, 'solidFill', this.NS.a);
        if (solidFill) return `background-color: ${this.parseColor(solidFill, '#FFFFFF')};`;

        const blipFill = this._get(bgPr, 'blipFill', this.NS.a);
        if (blipFill) {
            const blip = this._get(blipFill, 'blip', this.NS.a);
            const rId = blip?.getAttribute('r:embed');
            if (rId && slideRels) {
                const rel = slideRels.querySelector(`Relationship[Id="${rId}"]`);
                if (rel) {
                    const imgPath = this._resolveRelPath(slidePath, rel.getAttribute('Target'));
                    const imgFile = this.zip.file(imgPath);
                    if (imgFile) {
                        const blobUrl = await this.createImageBlobUrl(imgFile);
                        return `background-image: url(${blobUrl}); background-size: cover; background-position: center;`;
                    }
                }
            }
        }
        return 'background-color: #FFFFFF;';
    }

    async createImageBlobUrl(imgFile) {
        try {
            const mimeType = this.getMimeType(imgFile.name);
            const blob = await imgFile.async('blob');
            return URL.createObjectURL(blob);
        } catch(e) {
            console.error("Failed to create blob URL for image", e);
            return '';
        }
    }

    getMimeType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        switch (ext) {
            case 'png': return 'image/png';
            case 'jpg': case 'jpeg': return 'image/jpeg';
            case 'gif': return 'image/gif';
            case 'svg': return 'image/svg+xml';
            default: return 'application/octet-stream';
        }
    }

    async convert() {
        await this.parseTheme();

        const presentationXml = await this.getXml('ppt/presentation.xml');
        const sldSz = this._get(presentationXml.documentElement, 'sldSz', this.NS.p);
        const slideWidth = emuToPx(sldSz?.getAttribute('cx') || '9144000');
        const slideHeight = emuToPx(sldSz?.getAttribute('cy') || '5143500');

        const sldIdLst = this._get(presentationXml.documentElement, 'sldIdLst', this.NS.p);
        const slideIds = this._getAll(sldIdLst, 'sldId', this.NS.p).map(el => el.getAttribute('r:id'));

        const presRelsXml = await this.getXml('ppt/_rels/presentation.xml.rels');
        
        let allSlidesHtml = '';
        for (const [index, rId] of slideIds.entries()) {
            try {
                const slideRel = presRelsXml.querySelector(`Relationship[Id="${rId}"]`);
                if (!slideRel) continue;
                
                const slideTargetPath = slideRel.getAttribute('Target');
                const slidePath = `ppt/${slideTargetPath}`;
                
                const slideXml = await this.getXml(slidePath);
                if (!slideXml) continue;

                const slideRelsPath = `ppt/slides/_rels/${slideTargetPath.split('/').pop()}.rels`;
                let slideRelsXml = await this.getXml(slideRelsPath);
                
                const backgroundStyle = await this.parseBackground(slideXml, slideRelsXml, slidePath);
                
                let slideContentHtml = '';
                const spTree = this._get(this._get(slideXml.documentElement, 'cSld', this.NS.p), 'spTree', this.NS.p);

                if (spTree) {
                    for (const childNode of Array.from(spTree.children)) {
                        if (childNode.namespaceURI !== this.NS.p) continue;
                        const tagName = childNode.localName;

                        if (tagName === 'sp' || tagName === 'pic') {
                            slideContentHtml += await this.parseShape(childNode, slideRelsXml, slidePath);
                        } else if (tagName === 'graphicFrame') {
                            slideContentHtml += await this.parseGraphicFrame(childNode, slideRelsXml, slidePath);
                        } else if (tagName === 'grpSp') {
                            slideContentHtml += await this.parseGroupShape(childNode, slideRelsXml, slidePath);
                        }
                    }
                }
                allSlidesHtml += `<div class="slide" style="width: ${slideWidth}px; height: ${slideHeight}px; position: relative; overflow: hidden; ${backgroundStyle}">${slideContentHtml}</div>`;

            } catch (e) {
                 console.error(`Error processing slide rId=${rId}:`, e);
                 allSlidesHtml += `<div class="slide" style="width: ${slideWidth}px; height: ${slideHeight}px; display: flex; align-items: center; justify-content: center; background-color: #fee; border: 1px solid #f88;">Slide ${index + 1} could not be loaded.</div>`;
            }
        }
        
        const finalHtml = `<div id="pptx-container">${allSlidesHtml}</div>`;
        return finalHtml;
    }
}

export async function convertPptxToHtml(file) {
    if (!window.JSZip) {
        throw new Error("JSZip library is not loaded.");
    }

    const zip = await JSZip.loadAsync(file);
    const converter = new PptxConverter(zip);
    return await converter.convert();
}