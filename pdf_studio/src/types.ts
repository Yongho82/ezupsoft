import React from 'react';

export type ToolID = 'home' | 'merge' | 'split' | 'compress' | 'convert' | 'watermark' | 'edit';

export interface Tool {
  id: ToolID;
  name: string;
  icon: React.ReactElement;
}

export interface PdfFile {
  id: string;
  file: File;
  previewUrl?: string;
  pageCount: number;
  isLoading: boolean;
}

export interface SplitRange {
    id: string;
    from: number;
    to: number;
}