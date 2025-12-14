
import { useCallback } from 'react';
import { PdfFile } from '../types';
import { getFormattedFilename } from '../utils/filename';
import { convertPptxToHtml } from '../utils/pptxConverter';
import { useLanguage } from '../contexts/LanguageContext';

// pdfjsLib is now available on the window object, loaded via script tag in index.html
declare const window: any;
declare const JSZip: any;
declare const imageCompression: any;
declare const mammoth: any;
declare const XLSX: any;
declare const html2pdf: any;
declare const PptxGenJS: any;


export type CompressionLevel = 'strong' | 'recommended' | 'quality';

export const usePdfHandler = () => {
    const { t } = useLanguage();

    const convertImageToPdf = useCallback(async (file: File): Promise<File | null> => {
        try {
            const { PDFDocument } = window.PDFLib;
            const pdfDoc = await PDFDocument.create();
            const imageBytes = await file.arrayBuffer();
            
            let image;
            if (file.type === 'image/jpeg') {
                image = await pdfDoc.embedJpg(imageBytes);
            } else if (file.type === 'image/png') {
                image = await pdfDoc.embedPng(imageBytes);
            } else {
                console.error('Unsupported image type for conversion:', file.type);
                return null;
            }
    
            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
    
            const pdfBytes = await pdfDoc.save();
            const newFileName = file.name.substring(0, file.name.lastIndexOf('.')) + '.pdf';
            
            return new File([pdfBytes], newFileName, { type: 'application/pdf' });
        } catch (error) {
            console.error('Failed to convert image to PDF', error);
            alert(t('alert.imageToPdfFailed', { fileName: file.name }));
            return null;
        }
    }, [t]);

    const convertOfficeToPdf = useCallback(async (file: File): Promise<File | null> => {
        try {
            const extension = file.name.split('.').pop()?.toLowerCase();
            
            if (extension === 'pptx') {
                const tempDiv = document.createElement('div');
                // Hide it, but keep it in the DOM for rendering, ensuring it doesn't affect layout
                tempDiv.style.position = 'absolute';
                tempDiv.style.left = '0';
                tempDiv.style.top = '0';
                tempDiv.style.width = '0';
                tempDiv.style.height = '0';
                tempDiv.style.overflow = 'hidden';

                document.body.appendChild(tempDiv);

                try {
                    const htmlContent = await convertPptxToHtml(file);
                    tempDiv.innerHTML = htmlContent;

                    // Wait a moment for rendering, especially for images from blob URLs
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { PDFDocument } = window.PDFLib;
                    const { html2canvas } = window;
                    
                    const pdfDoc = await PDFDocument.create();
                    // The new converter creates divs with class 'slide'
                    const slides = tempDiv.querySelectorAll('.slide');

                    if (slides.length === 0) {
                        console.error("Debug Info: tempDiv innerHTML:", tempDiv.innerHTML);
                        throw new Error(t('alert.pptxNoSlides'));
                    }
                    
                    for (const slide of Array.from(slides)) {
                         const canvas = await html2canvas(slide as HTMLElement, {
                            scale: 1.5,
                            useCORS: true,
                            allowTaint: true,
                            logging: false, // Set to true for debugging
                            backgroundColor: '#ffffff'
                        });

                        const imgData = canvas.toDataURL('image/jpeg', 0.95);
                        const jpgImage = await pdfDoc.embedJpg(imgData);

                        const { width, height } = canvas;
                        const page = pdfDoc.addPage([width, height]);
                        page.drawImage(jpgImage, {
                            x: 0, y: 0,
                            width: page.getWidth(),
                            height: page.getHeight(),
                        });
                    }
                    
                    const pdfBytes = await pdfDoc.save();
                    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
                    const newFileName = getFormattedFilename(file.name, undefined, 'pdf');
                    return new File([pdfBlob], newFileName, { type: 'application/pdf' });

                } catch (convError) {
                    console.error('Error during PPTX to PDF conversion steps:', convError);
                    throw convError;
                } finally {
                    // Cleanup blob URLs created during conversion
                    const images = tempDiv.querySelectorAll('img');
                    images.forEach(img => {
                        if (img.src.startsWith('blob:')) {
                            URL.revokeObjectURL(img.src);
                        }
                    });
                    document.body.removeChild(tempDiv);
                }

            } else { // Handle docx, xls, xlsx, html
                let container = document.createElement('div');
                // Move container off-screen but keep visible to DOM for rendering
                container.style.position = 'fixed';
                container.style.left = '-10000px';
                container.style.top = '0';
                container.style.zIndex = '-1';
                document.body.appendChild(container);

                let contentWrapper = document.createElement('div');
                container.appendChild(contentWrapper);

                let opt: any = {
                    margin:       [0.5, 0.5, 0.5, 0.5],
                    filename:     `${file.name.substring(0, file.name.lastIndexOf('.'))}.pdf`,
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0 },
                    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
                    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                };

                if (extension === 'docx') {
                     // Use docx-preview for better layout fidelity
                    const arrayBuffer = await file.arrayBuffer();
                    
                    // Add specific styles to reset docx-preview defaults that might conflict with html2pdf
                    const style = document.createElement('style');
                    style.innerHTML = `
                        .docx-wrapper { background: white !important; padding: 0 !important; }
                        .docx-wrapper > section { 
                            box-shadow: none !important; 
                            margin-bottom: 0 !important;
                            margin-top: 0 !important;
                            background: white !important; 
                        }
                    `;
                    contentWrapper.className = 'docx-wrapper';
                    contentWrapper.appendChild(style);

                    // docx-preview renders directly into the element
                    await window.docx.renderAsync(arrayBuffer, contentWrapper, null, {
                        inWrapper: false, // We manage the wrapper to control styles
                        ignoreWidth: false, 
                        ignoreHeight: false 
                    });
                    
                    // IMPORTANT: Set margins to 0 because docx-preview already renders the page with internal margins.
                    // Adding margins here would shift content and cause overflow (blank pages).
                    opt.margin = 0;
                } else if (['xls', 'xlsx'].includes(extension || '')) {
                    const arrayBuffer = await file.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    let finalHtml = '';
                    workbook.SheetNames.forEach(sheetName => {
                        const worksheet = workbook.Sheets[sheetName];
                        finalHtml += `<h3>${sheetName}</h3>`;
                        finalHtml += XLSX.utils.sheet_to_html(worksheet);
                    });
                    
                    contentWrapper.innerHTML = finalHtml;
                    const style = document.createElement('style');
                    style.innerHTML = `
                        table { border-collapse: collapse; width: 100%; font-size: 12px; font-family: sans-serif; }
                        th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; white-space: normal; word-break: break-all; }
                        th { background-color: #f2f2f2; }
                        h3 { font-size: 16px; margin-top: 20px; page-break-before: always; font-family: sans-serif; }
                    `;
                    container.appendChild(style);
                    opt.jsPDF.orientation = 'landscape';

                } else if (['html', 'htm'].includes(extension || '')) {
                    const htmlContent = await file.text();
                    contentWrapper.innerHTML = htmlContent;
                } else {
                    document.body.removeChild(container);
                    console.error('Unsupported office file type for conversion:', file.type);
                    return null;
                }
                
                // Wait slightly for images/fonts
                await new Promise(resolve => setTimeout(resolve, 500));
    
                const pdfBlob = await html2pdf().set(opt).from(contentWrapper).output('blob');
                document.body.removeChild(container);
                
                const newFileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                return new File([pdfBlob], `${newFileName}.pdf`, { type: 'application/pdf' });
            }
            return null;
        } catch (error) {
            console.error('Failed to convert office file to PDF', error);
            alert(t('alert.officeToPdfFailed', { fileName: file.name }));
            return null;
        }
    }, [t]);

    const generatePreview = useCallback(async (file: File): Promise<Omit<PdfFile, 'isLoading'> | null> => {
        // Handle Images
        if (file.type.startsWith('image/')) {
             return new Promise((resolve) => {
                const url = URL.createObjectURL(file);
                const img = new Image();
                img.onload = () => {
                    resolve({
                        id: `${file.name}-${file.size}`,
                        file,
                        previewUrl: url,
                        pageCount: 1,
                    });
                };
                img.onerror = () => {
                    console.error('Failed to generate preview for image:', file.name);
                    resolve(null);
                };
                img.src = url;
            });
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
            const page = await pdf.getPage(1);
            
            const viewport = page.getViewport({ scale: 0.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Could not get canvas context');
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport }).promise;
            
            return {
                id: `${file.name}-${file.size}`,
                file,
                previewUrl: canvas.toDataURL(),
                pageCount: pdf.numPages,
            };
        } catch (error) {
            console.error('Failed to generate preview for', file.name, error);
            alert(t('alert.previewFailed', { fileName: file.name }));
            return null;
        }
    }, [t]);

    const generateAllPagesPreview = useCallback(async (file: File): Promise<string[] | null> => {
        // Handle Images
        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            return [url];
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
            const numPages = pdf.numPages;
            const previews: string[] = [];
    
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                // Use a smaller scale for thumbnails to improve performance
                const viewport = page.getViewport({ scale: 0.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) continue;
    
                canvas.height = viewport.height;
                canvas.width = viewport.width;
    
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                // Use jpeg for smaller file size
                previews.push(canvas.toDataURL('image/jpeg', 0.8));
            }
    
            return previews;
        } catch (error) {
            console.error('Failed to generate all page previews for', file.name, error);
            alert(t('alert.allPreviewsFailed', { fileName: file.name }));
            return null;
        }
    }, [t]);
    
    const generateSinglePagePreview = useCallback(async (file: File, pageNumber: number): Promise<{ url: string; width: number; height: number; } | null> => {
        // Handle Images
        if (file.type.startsWith('image/')) {
            if (pageNumber !== 1) return null;
             return new Promise((resolve) => {
                const url = URL.createObjectURL(file);
                const img = new Image();
                img.onload = () => {
                    resolve({ url, width: img.width, height: img.height });
                };
                img.onerror = () => {
                    console.error(`Failed to generate preview for image page ${pageNumber} of ${file.name}`);
                    resolve(null);
                };
                img.src = url;
            });
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
            
            if (pageNumber < 1 || pageNumber > pdf.numPages) {
                console.error(`Invalid page number requested: ${pageNumber} for a PDF with ${pdf.numPages} pages.`);
                return null;
            }

            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale: 0.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Could not get canvas context');
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport }).promise;
            
            return {
                url: canvas.toDataURL('image/jpeg', 0.8),
                width: viewport.width,
                height: viewport.height,
            };
        } catch (error) {
            console.error(`Failed to generate preview for page ${pageNumber} of ${file.name}`, error);
            return null;
        }
    }, []);

    const generateViewerPagePreview = useCallback(async (file: File, pageNumber: number): Promise<string | null> => {
        // Handle Images
        if (file.type.startsWith('image/')) {
             if (pageNumber !== 1) return null;
             return URL.createObjectURL(file);
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
            
            if (pageNumber < 1 || pageNumber > pdf.numPages) {
                console.error(`Invalid page number requested: ${pageNumber} for a PDF with ${pdf.numPages} pages.`);
                return null;
            }

            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale: 2.0 }); // High quality scale
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Could not get canvas context');
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport }).promise;
            
            return canvas.toDataURL('image/png'); // High quality format
        } catch (error) {
            console.error(`Failed to generate viewer preview for page ${pageNumber} of ${file.name}`, error);
            return null;
        }
    }, []);

    const mergePdfs = useCallback(async (files: File[]): Promise<Uint8Array | null> => {
        try {
            const { PDFDocument } = window.PDFLib;
            const mergedPdf = await PDFDocument.create();
            
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }
            
            const mergedPdfBytes = await mergedPdf.save();
            return mergedPdfBytes;
        } catch (error) {
            console.error('Failed to merge PDFs', error);
            alert(t('alert.mergeFailed'));
            return null;
        }
    }, [t]);

    const createZipFromBlobs = useCallback(async (files: { filename: string; blob: Blob }[]): Promise<Blob> => {
        const zip = new JSZip();
        files.forEach(file => {
            zip.file(file.filename, file.blob);
        });
    
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        return zipBlob;
    }, []);

    const splitPdfByRanges = useCallback(async (file: File, ranges: { from: number; to: number }[], mergeResult: boolean): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
            const { PDFDocument } = window.PDFLib;
            const originalPdfBytes = await file.arrayBuffer();

            if (mergeResult) {
                const pdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true });
                const mergedPdf = await PDFDocument.create();
                
                for (const range of ranges) {
                    const pageIndices = Array.from({ length: range.to - range.from + 1 }, (_, i) => range.from + i - 1)
                        .filter(i => i >= 0 && i < pdfDoc.getPageCount());
                    
                    if (pageIndices.length > 0) {
                        const copiedPages = await mergedPdf.copyPages(pdfDoc, pageIndices);
                        copiedPages.forEach(page => mergedPdf.addPage(page));
                    }
                }

                if (mergedPdf.getPageCount() > 0) {
                    const pdfBytes = await mergedPdf.save();
                    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                    return { blob, filename: getFormattedFilename(file.name, 'merged', 'pdf') };
                } else {
                    alert(t('alert.noValidPagesToMerge'));
                    return null;
                }
            } else {
                const filesToDownload: { filename: string; blob: Blob }[] = [];
                const pdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true });
                for (const [index, range] of ranges.entries()) {
                    const newPdf = await PDFDocument.create();
                    
                    const pageIndices = Array.from({ length: range.to - range.from + 1 }, (_, i) => range.from + i - 1)
                        .filter(i => i >= 0 && i < pdfDoc.getPageCount());

                    if (pageIndices.length > 0) {
                        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
                        copiedPages.forEach(page => newPdf.addPage(page));

                        const pdfBytes = await newPdf.save();
                        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                        filesToDownload.push({ filename: getFormattedFilename(file.name, `range_${range.from}-${range.to}`, 'pdf'), blob });
                    } else {
                         alert(t('alert.noValidPagesInRange', { index: index + 1, from: range.from, to: range.to }));
                    }
                }

                if (filesToDownload.length > 1) {
                    const zipBlob = await createZipFromBlobs(filesToDownload);
                    return { blob: zipBlob, filename: getFormattedFilename(file.name, 'split_ranges', 'zip') };
                } else if (filesToDownload.length === 1) {
                    return { blob: filesToDownload[0].blob, filename: filesToDownload[0].filename };
                }
                return null;
            }
        } catch (error) {
            console.error('Failed to split PDF', error);
            alert(t('alert.splitFailed'));
            return null;
        }
    }, [createZipFromBlobs, t]);

    const splitPdfByPages = useCallback(async (file: File, pages: number[], mergeResult: boolean): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
            const { PDFDocument } = window.PDFLib;
            const originalPdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true });

            if (mergeResult) {
                const mergedPdf = await PDFDocument.create();
                const pageIndices = pages.map(p => p - 1).filter(i => i >= 0 && i < pdfDoc.getPageCount());
                if (pageIndices.length > 0) {
                    const copiedPages = await mergedPdf.copyPages(pdfDoc, pageIndices);
                    copiedPages.forEach(page => mergedPdf.addPage(page));
                    const pdfBytes = await mergedPdf.save();
                    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                    return { blob, filename: getFormattedFilename(file.name, 'merged_pages', 'pdf') };
                } else {
                    alert(t('alert.noValidPagesToMerge'));
                    return null;
                }
            } else {
                const filesToDownload: { filename: string; blob: Blob }[] = [];
                for (const pageNum of pages) {
                    const pageIndex = pageNum - 1;
                    if (pageIndex >= 0 && pageIndex < pdfDoc.getPageCount()) {
                        const newPdf = await PDFDocument.create();
                        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
                        newPdf.addPage(copiedPage);
                        const pdfBytes = await newPdf.save();
                        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                        filesToDownload.push({ filename: getFormattedFilename(file.name, `page_${pageNum}`, 'pdf'), blob });
                    }
                }

                 if (filesToDownload.length > 1) {
                    const zipBlob = await createZipFromBlobs(filesToDownload);
                    return { blob: zipBlob, filename: getFormattedFilename(file.name, 'split_pages', 'zip') };
                } else if (filesToDownload.length === 1) {
                    return { blob: filesToDownload[0].blob, filename: filesToDownload[0].filename };
                }
                return null;
            }
        } catch (error) {
            console.error('Failed to split PDF by pages', error);
            alert(t('alert.splitByPageFailed'));
            return null;
        }
    }, [createZipFromBlobs, t]);

    const splitPdfBySize = useCallback(async (file: File, maxBytes: number, allowCompression: boolean): Promise<{ blob: Blob; filename: string; } | null> => {
        alert(t('alert.splitBySizeNotSupported'));
        return null;
    }, [t]);
    
    const compressPdf = useCallback(async (
        file: File, 
        level: CompressionLevel
    ): Promise<{ blob: Blob; filename: string } | null> => {
        const { PDFDocument } = window.PDFLib;
    
        const getCompressionSettings = (level: CompressionLevel) => {
            switch (level) {
                case 'strong': return { dpi: 96, quality: 0.6 };
                case 'quality': return { dpi: 200, quality: 0.85 };
                case 'recommended':
                default:
                    return { dpi: 150, quality: 0.75 };
            }
        };
        const settings = getCompressionSettings(level);
    
        try {
            const newPdfDoc = await PDFDocument.create();
            const originalPdf = await window.pdfjsLib.getDocument(await file.arrayBuffer()).promise;
            const numPages = originalPdf.numPages;

            const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> => {
                return new Promise((resolve, reject) => {
                    canvas.toBlob(blob => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas to Blob conversion failed'));
                        }
                    }, type, quality);
                });
            };

            for(let i = 1; i <= numPages; i++) {
                const page = await originalPdf.getPage(i);
                const viewport = page.getViewport({ scale: settings.dpi / 72 });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d', { willReadFrequently: true });
                if(!context) continue;

                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                await page.render({ canvasContext: context, viewport: viewport }).promise;

                const canvasBlob = await canvasToBlob(canvas, 'image/jpeg', settings.quality);

                const compressedImageBlob = await imageCompression(canvasBlob, {
                    maxSizeMB: 2,
                    initialQuality: settings.quality,
                    useWebWorker: true,
                });
                const compressedImageBytes = new Uint8Array(await compressedImageBlob.arrayBuffer());

                const newPage = newPdfDoc.addPage([page.view[2], page.view[3]]);
                const embeddedImage = await newPdfDoc.embedJpg(compressedImageBytes);
                
                newPage.drawImage(embeddedImage, {
                    x: 0,
                    y: 0,
                    width: newPage.getWidth(),
                    height: newPage.getHeight(),
                });
            }
            
            const resultBytes = await newPdfDoc.save({ useObjectStreams: true });
            return {
                blob: new Blob([resultBytes], { type: 'application/pdf' }),
                filename: getFormattedFilename(file.name, 'compressed', 'pdf')
            };

        } catch (error) {
            console.error('Failed to compress PDF', error);
            alert(t('alert.compressFailed'));
            return null;
        }
    }, [t]);

    const convertPdfToImages = useCallback(async (
        file: File,
        format: 'jpeg' | 'png'
    ): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
            const originalPdf = await window.pdfjsLib.getDocument(await file.arrayBuffer()).promise;
            const numPages = originalPdf.numPages;
            const filesToZip: { filename: string; blob: Blob }[] = [];
            
            const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
            const ext = format === 'png' ? 'png' : 'jpg';

            const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
                return new Promise((resolve, reject) => {
                    canvas.toBlob(blob => {
                        if (blob) resolve(blob);
                        else reject(new Error('Canvas to Blob failed'));
                    }, mimeType, format === 'jpeg' ? 0.95 : undefined);
                });
            };
    
            for (let i = 1; i <= numPages; i++) {
                const page = await originalPdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
    
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) continue;
    
                canvas.width = viewport.width;
                canvas.height = viewport.height;
    
                await page.render({ canvasContext: context, viewport: viewport }).promise;
    
                const blob = await canvasToBlob(canvas);
                const pageFilename = getFormattedFilename(file.name, `page_${i}`, ext);
                filesToZip.push({ filename: pageFilename, blob });
            }
    
            if (filesToZip.length > 0) {
                if (filesToZip.length === 1) {
                    return { blob: filesToZip[0].blob, filename: filesToZip[0].filename };
                } else {
                    const zipBlob = await createZipFromBlobs(filesToZip);
                    return { blob: zipBlob, filename: getFormattedFilename(file.name, 'images', 'zip') };
                }
            } else {
                alert(t('alert.noJpgFilesCreated'));
                return null;
            }
    
        } catch (error) {
            console.error(`Failed to convert PDF to ${format}`, error);
            alert(format === 'jpeg' ? t('alert.pdfToJpgFailed') : t('alert.pdfToPngFailed'));
            return null;
        }
    }, [createZipFromBlobs, t]);

    // Backward compatibility
    const convertPdfToJpg = useCallback((file: File) => convertPdfToImages(file, 'jpeg'), [convertPdfToImages]);
    
    const extractTextFromPdf = async (file: File): Promise<string> => {
         const arrayBuffer = await file.arrayBuffer();
         const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
         let fullText = '';
         
         for (let i = 1; i <= pdf.numPages; i++) {
             const page = await pdf.getPage(i);
             const textContent = await page.getTextContent();
             // Simple join. Improved logic would sort by Y coordinate to handle columns.
             const pageText = textContent.items.map((item: any) => item.str).join(' ');
             fullText += pageText + '\n\n';
         }
         return fullText;
    };

    const convertPdfToText = useCallback(async (file: File): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
             const text = await extractTextFromPdf(file);
             const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
             return { blob, filename: getFormattedFilename(file.name, undefined, 'txt') };
        } catch (error) {
             console.error('Failed to convert PDF to Text', error);
             alert(t('alert.pdfToTextFailed'));
             return null;
        }
    }, [t]);

    const convertPdfToWord = useCallback(async (file: File): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
             const text = await extractTextFromPdf(file);
             // Creating a simple HTML document that Word can open
             const htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head>
                <body><pre style="font-family: Arial; font-size: 12pt; white-space: pre-wrap;">${text}</pre></body></html>
             `;
             
             const blob = new Blob(['\ufeff', htmlContent], {
                 type: 'application/msword'
             });
             
             return { blob, filename: getFormattedFilename(file.name, undefined, 'doc') };
        } catch (error) {
             console.error('Failed to convert PDF to Word', error);
             alert(t('alert.pdfToWordFailed'));
             return null;
        }
    }, [t]);

    const convertPdfToPpt = useCallback(async (file: File): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
            // Use PptxGenJS to create a valid PPTX file
            if (!window.PptxGenJS) {
                throw new Error("PptxGenJS library not loaded");
            }

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
            const pptx = new window.PptxGenJS();
            
            // Get the size of the first page to set the layout for the presentation.
            // PDF viewport size is in points. PptxGenJS layout defaults to inches (if width/height are numbers)
            // 1 inch = 72 points.
            const firstPage = await pdf.getPage(1);
            const firstPageViewport = firstPage.getViewport({ scale: 1.0 });
            const layoutName = 'PDF_LAYOUT';
            const widthInInches = firstPageViewport.width / 72;
            const heightInInches = firstPageViewport.height / 72;
            
            pptx.defineLayout({ name: layoutName, width: widthInInches, height: heightInInches });
            pptx.layout = layoutName;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // Scale 2.0 for decent image quality
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) continue;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;
                
                // Use JPEG for compression to avoid huge file sizes
                const imgData = canvas.toDataURL('image/jpeg', 0.8); 
                
                const slide = pptx.addSlide();
                // Add image to cover the slide. Use the layout dimensions.
                slide.addImage({ data: imgData, x: 0, y: 0, w: widthInInches, h: heightInInches });
            }

            // Generate the file
            const blob = await pptx.write({ outputType: 'blob' });
            
            return { blob, filename: getFormattedFilename(file.name, undefined, 'pptx') };
        } catch (error) {
             console.error('Failed to convert PDF to PowerPoint', error);
             alert(t('alert.pdfToPptFailed'));
             return null;
        }
    }, [t]);

    const convertPdfToExcel = useCallback(async (file: File): Promise<{ blob: Blob; filename: string; } | null> => {
        try {
            if (!window.XLSX) {
                throw new Error("SheetJS (XLSX) library not loaded");
            }

             const text = await extractTextFromPdf(file);
             
             // Split text into lines for a basic row structure
             const rows = text.split('\n').map(line => [line.trim()]);
             
             const wb = window.XLSX.utils.book_new();
             const ws = window.XLSX.utils.aoa_to_sheet(rows);
             
             window.XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
             
             // Write to a valid .xlsx file
             const wbout = window.XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
             const blob = new Blob([wbout], { type: "application/octet-stream" });
             
             return { blob, filename: getFormattedFilename(file.name, undefined, 'xlsx') };
        } catch (error) {
             console.error('Failed to convert PDF to Excel', error);
             alert(t('alert.pdfToExcelFailed'));
             return null;
        }
    }, [t]);

    const deletePage = useCallback(async (file: File, pageNumber: number): Promise<File | null> => {
        try {
            const { PDFDocument } = window.PDFLib;
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            if (pageNumber > 0 && pageNumber <= pdfDoc.getPageCount()) {
                // A PDF must have at least one page. Return original file if this is the last one.
                if (pdfDoc.getPageCount() <= 1) {
                    return file;
                }
                pdfDoc.removePage(pageNumber - 1);
                const newPdfBytes = await pdfDoc.save();
                return new File([newPdfBytes], file.name, { type: 'application/pdf' });
            }
            return file; // Return original if page number is invalid
        } catch (error) {
            console.error('Failed to delete page', error);
            alert(t('alert.deletePageFailed'));
            return null;
        }
    }, [t]);

    const duplicatePage = useCallback(async (file: File, pageNumber: number): Promise<File | null> => {
        try {
            const { PDFDocument } = window.PDFLib;
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            if (pageNumber > 0 && pageNumber <= pdfDoc.getPageCount()) {
                const [copiedPage] = await pdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
                pdfDoc.insertPage(pageNumber, copiedPage);
                const newPdfBytes = await pdfDoc.save();
                return new File([newPdfBytes], file.name, { type: 'application/pdf' });
            }
            return file;
        } catch (error) {
            console.error('Failed to duplicate page', error);
            alert(t('alert.duplicatePageFailed'));
            return null;
        }
    }, [t]);

    const rotatePage = useCallback(async (file: File, pageNumber: number, degrees: number): Promise<File | null> => {
        try {
            const { PDFDocument, RotationTypes } = window.PDFLib;
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            if (pageNumber > 0 && pageNumber <= pdfDoc.getPageCount()) {
                const page = pdfDoc.getPage(pageNumber - 1);
                const currentRotation = page.getRotation().angle;
                page.setRotation({ type: RotationTypes.Degrees, angle: (currentRotation + degrees) % 360 });
                const newPdfBytes = await pdfDoc.save();
                return new File([newPdfBytes], file.name, { type: 'application/pdf' });
            }
            return file;
        } catch (error) {
            console.error('Failed to rotate page', error);
            alert(t('alert.rotatePageFailed'));
            return null;
        }
    }, [t]);

    return { 
        generatePreview, 
        mergePdfs, 
        splitPdfByRanges,
        splitPdfByPages,
        splitPdfBySize,
        compressPdf,
        generateAllPagesPreview,
        generateSinglePagePreview,
        generateViewerPagePreview,
        convertImageToPdf,
        convertPdfToJpg,
        convertPdfToImages,
        convertPdfToText,
        convertPdfToWord,
        convertPdfToPpt,
        convertPdfToExcel,
        convertOfficeToPdf,
        deletePage,
        duplicatePage,
        rotatePage,
    };
};
