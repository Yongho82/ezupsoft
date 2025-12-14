

export const getFormattedFilename = (originalFilename?: string, suffix?: string, extension: string = 'pdf'): string => {
    if (originalFilename) {
        const nameWithoutExtension = originalFilename.lastIndexOf('.') !== -1 
            ? originalFilename.substring(0, originalFilename.lastIndexOf('.')) 
            : originalFilename;
        
        if (suffix) {
            return `${nameWithoutExtension}_${suffix}.${extension}`;
        }
        return `${nameWithoutExtension}.${extension}`;
    }

    // Fallback to old format if no original filename is provided.
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const base = `이지업_pdftool_${year}${month}${day}_${hours}${minutes}`;
    
    if (suffix) {
        return `${base}_${suffix}.${extension}`;
    }
    return `${base}.${extension}`;
};

export const getFileExtension = (filename: string): string => {
    if (!filename || filename.lastIndexOf('.') === -1) {
        return '';
    }
    return filename.slice(filename.lastIndexOf('.') + 1).toUpperCase();
};