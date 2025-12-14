import { PdfFile } from '../types';
import { PageObjects, ImageObject } from '../types/editPageTypes';
import { getShapePath } from './shapePaths';
import { degrees, rgb, StandardFonts, PDFFont } from 'pdf-lib';

declare const window: any;

const FONT_URL_MAP: Record<string, { regular: string; bold?: string; }> = {
    'Noto Sans KR': {
        regular: 'https://fonts.gstatic.com/s/notosanskr/v27/PbykFmztBca2G-upFEc_kjV0_Mfc-6G1URI.otf',
        bold: 'https://fonts.gstatic.com/s/notosanskr/v27/Pby7FmztBca2G-upFEc_kjV01_5f-6G1URNi.otf',
    },
    'Nanum Gothic': { 
        regular: 'https://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oZ3f2eTywsDOE9T_42V3.ttf',
        bold: 'https://fonts.gstatic.com/s/nanumgothic/v23/PN_zRfi-oZ3f2eTywsDOE9T_wpc1_w.ttf'
    },
    'Nanum Myeongjo': { 
        regular: 'https://fonts.gstatic.com/s/nanummyeongjo/v23/9Btx3DGN0EONj90bTMnFcTTbbekSH20.ttf',
        bold: 'https://fonts.gstatic.com/s/nanummyeongjo/v23/9Bty3DGN0EONj90bTMnFcTTbbEYyS2-5_g.ttf'
    },
    'Nanum Pen Script': { regular: 'https://fonts.gstatic.com/s/nanumpenscript/v23/daaDSSYiLGqEal3MvdA_FOL_3FkN2z4.ttf' },
    'Gothic A1': { 
        regular: 'https://fonts.gstatic.com/s/gothica1/v13/CSR74z5ZnPydRjlCCwl_PA.ttf',
        bold: 'https://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwl6b_0d.ttf'
    },
    'Do Hyeon': { regular: 'https://fonts.gstatic.com/s/dohyeon/v16/R71RjywJydhT8Y2l.ttf' },
    'Black Han Sans': { regular: 'https://fonts.gstatic.com/s/blackhansans/v16/ea8Aad44W2naP6aIMaG5B-L-Hw.ttf' },
    'Roboto': { 
        regular: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.ttf',
        bold: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf'
    },
    'Open Sans': { 
        regular: 'https://fonts.gstatic.com/s/opensans/v36/mem8YaGs126MiZpBA-UFVZ0b.ttf',
        bold: 'https://fonts.gstatic.com/s/opensans/v36/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf'
    },
    'Lato': { 
        regular: 'https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk.ttf',
        bold: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPGQ.ttf'
    },
    'Montserrat': { 
        regular: 'https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf',
        bold: 'https://fonts.gstatic.com/s/montserrat/v26/JTURjIg1_i6t8kCHKm45_dJE3gTD_u50.ttf'
    },
    'Playfair Display': { regular: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiunDXbtM.ttf' },
    'Lobster': { regular: 'https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoK-PA.ttf' },
    'Pacifico': { regular: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6w.ttf' },
    'Arial': { regular: '' }, // System font, fallback to Helvetica
    'Verdana': { regular: '' }, // System font, fallback to Helvetica
    'Times New Roman': { regular: '' }, // System font, fallback to Helvetica
};

let fontsCache: Record<string, ArrayBuffer> = {};

const fetchFonts = async () => {
    try {
        for (const font of Object.values(FONT_URL_MAP)) {
            if (font.regular && !fontsCache[font.regular]) {
                fontsCache[font.regular] = await fetch(font.regular).then(res => res.arrayBuffer());
            }
            if (font.bold && !fontsCache[font.bold]) {
                fontsCache[font.bold] = await fetch(font.bold).then(res => res.arrayBuffer());
            }
        }
    } catch (e) {
        console.error("Failed to fetch fonts", e);
    }
};

fetchFonts();

export const downloadPdf = async (file: PdfFile, pageObjects: PageObjects) => {
    const { drawingsByPage, textObjectsByPage, imageObjectsByPage, shapeObjectsByPage } = pageObjects;
    const hasDrawings = Object.values(drawingsByPage).some(d => Array.isArray(d) && d.length > 0);
    const hasText = Object.values(textObjectsByPage).some(t => Array.isArray(t) && t.length > 0);
    const hasImages = Object.values(imageObjectsByPage).some(i => Array.isArray(i) && i.length > 0);
    const hasShapes = Object.values(shapeObjectsByPage).some(s => Array.isArray(s) && s.length > 0);

    let fileToDownload = file.file;

    if (hasDrawings || hasText || hasImages || hasShapes) {
        const { PDFDocument } = window.PDFLib;
        const existingPdfBytes = await file.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const fontMapping: Record<string, PDFFont> = {};
        
        const getFont = async (family: string, isBold: boolean): Promise<PDFFont> => {
            let fontKey = `${family}-${isBold}`;
            if (fontMapping[fontKey]) return fontMapping[fontKey];

            const fontData = FONT_URL_MAP[family];
            let fontUrl: string | undefined;

            if (fontData) {
                fontUrl = (isBold && fontData.bold) ? fontData.bold : fontData.regular;
            }

            if (fontUrl && fontsCache[fontUrl]) {
                try {
                    fontMapping[fontKey] = await pdfDoc.embedFont(fontsCache[fontUrl]);
                    return fontMapping[fontKey];
                } catch (e) {
                    console.error(`Failed to embed font: ${family}`, e);
                }
            }
            
            // Fallback for system fonts or failed loads
            fontMapping[fontKey] = await pdfDoc.embedFont(isBold ? StandardFonts.HelveticaBold : StandardFonts.Helvetica);
            return fontMapping[fontKey];
        };

        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255,
            } : { r: 0, g: 0, b: 0 };
        };

        const pages = pdfDoc.getPages();

        for (let i = 0; i < pages.length; i++) {
            const pageNumber = i + 1;
            const page = pages[i];
            const { width: pageWidth, height: pageHeight } = page.getSize();
            
            const pageDrawings = drawingsByPage[pageNumber];
            if (pageDrawings) {
                for (const drawing of pageDrawings) {
                    if (drawing.points.length < 2) continue;
                    let pathData = drawing.points.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x * pageWidth} ${pageHeight - (p.y * pageHeight)}`).join(' ');
                    const color = hexToRgb(drawing.color);
                    page.drawSvgPath(pathData.trim(), {
                        borderColor: rgb(color.r, color.g, color.b),
                        borderWidth: drawing.strokeWidth,
                        borderDashArray: drawing.dashArray,
                    });
                }
            }

            const pageShapeObjects = shapeObjectsByPage[pageNumber];
            if (pageShapeObjects) {
                for (const shapeObj of pageShapeObjects) {
                    page.pushGraphicsState();
                    
                    const shapeWidth = shapeObj.width * pageWidth;
                    const shapeHeight = shapeObj.height * pageHeight;
                    const shapeX = shapeObj.x * pageWidth;
                    const shapeY = pageHeight - (shapeObj.y * pageHeight) - shapeHeight;

                    page.setOpacity(shapeObj.opacity ?? 1);
                    page.translate(shapeX + shapeWidth / 2, shapeY + shapeHeight / 2);
                    page.rotate(degrees(-shapeObj.rotation));
                    page.translate(-shapeWidth / 2, -shapeHeight / 2);
                    
                    const svgPath = getShapePath(shapeObj.shapeType);
                    const options: any = {
                        x: 0, y: 0, scaleX: shapeWidth / 100, scaleY: shapeHeight / 100, 
                        borderWidth: shapeObj.strokeWidth,
                        borderDashArray: shapeObj.strokeDashArray,
                    };

                    if (shapeObj.strokeColor !== 'transparent') options.borderColor = rgb(...Object.values(hexToRgb(shapeObj.strokeColor)));
                    if (shapeObj.fillColor !== 'transparent') options.color = rgb(...Object.values(hexToRgb(shapeObj.fillColor)));

                    page.drawSvgPath(svgPath, options);
                    page.popGraphicsState();

                    if (shapeObj.text && shapeObj.text.trim() !== '') {
                        const text = shapeObj.text;
                        const font = await getFont(shapeObj.fontFamily || 'Noto Sans KR', shapeObj.isBold || false);
                        
                        const scale = Math.min(shapeWidth / 100, shapeHeight / 100);
                        const scaledFontSize = (shapeObj.fontSize || 16) * scale;
                        const color = hexToRgb(shapeObj.textColor || '#000000');
                        
                        const lines = text.split('\n');
                        const lineHeight = scaledFontSize * 1.2;
                        const totalHeight = lines.length * lineHeight - (lineHeight - scaledFontSize);

                        page.pushGraphicsState();
                        page.setOpacity(shapeObj.opacity ?? 1);
                        page.translate(shapeX + shapeWidth / 2, shapeY + shapeHeight / 2);
                        page.rotate(degrees(-shapeObj.rotation));

                        let y_offset = totalHeight / 2 - (font.ascender / 1000 * scaledFontSize);
                        
                        for (const line of lines) {
                            const lineWidth = font.widthOfTextAtSize(line, scaledFontSize);
                            page.drawText(line, {
                                x: -lineWidth / 2,
                                y: y_offset,
                                font,
                                size: scaledFontSize,
                                color: rgb(color.r, color.g, color.b),
                            });
                            y_offset -= lineHeight;
                        }
                        page.popGraphicsState();
                    }
                }
            }

            const pageTextObjects = textObjectsByPage[pageNumber];
            if (pageTextObjects) {
                const originalPage = await window.pdfjsLib.getDocument(await file.file.arrayBuffer()).promise.then((pdf: any) => pdf.getPage(pageNumber));
                const viewport = originalPage.getViewport({ scale: 2.0 });
                const pointSizeRatio = pageWidth / viewport.width;

                for (const textObj of pageTextObjects) {
                    if (textObj.backgroundColor && textObj.backgroundColor !== 'transparent') {
                        const bgColor = hexToRgb(textObj.backgroundColor);
                        page.drawRectangle({
                            x: textObj.x * pageWidth,
                            y: pageHeight - (textObj.y * pageHeight) - (textObj.height * pageHeight),
                            width: textObj.width * pageWidth,
                            height: textObj.height * pageHeight,
                            color: rgb(bgColor.r, bgColor.g, bgColor.b),
                        });
                    }
                    
                    const font = await getFont(textObj.fontFamily, textObj.isBold);
                    const fontSizeInPt = textObj.fontSize * pointSizeRatio;
                    const color = hexToRgb(textObj.color);

                    page.drawText(textObj.text, {
                        x: textObj.x * pageWidth + (2 * pointSizeRatio),
                        y: pageHeight - (textObj.y * pageHeight) - fontSizeInPt,
                        font: font,
                        size: fontSizeInPt,
                        color: rgb(color.r, color.g, color.b),
                        lineHeight: fontSizeInPt * 1.2,
                        maxWidth: textObj.width * pageWidth - (4 * pointSizeRatio)
                    });
                }
            }

            const pageImageObjects = imageObjectsByPage[pageNumber];
            if (pageImageObjects) {
                for (const imageObj of pageImageObjects) {
                    const imageBytes = await fetch(imageObj.displaySrc).then(res => res.arrayBuffer());
                    const pdfImage = imageObj.fileType === 'image/png' ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);
                    
                    page.drawImage(pdfImage, {
                        x: imageObj.x * pageWidth,
                        y: pageHeight - (imageObj.y * pageHeight) - (imageObj.height * pageHeight),
                        width: imageObj.width * pageWidth,
                        height: imageObj.height * pageHeight,
                        opacity: imageObj.opacity,
                    });
                }
            }
        }
        const pdfBytes = await pdfDoc.save();
        fileToDownload = new File([pdfBytes], file.file.name, { type: 'application/pdf' });
    }

    const url = URL.createObjectURL(fileToDownload);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileToDownload.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};