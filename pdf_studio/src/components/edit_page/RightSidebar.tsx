import React from 'react';
import { PdfFile } from '../../types';
import { FileThumbnailList } from './FileThumbnailList';
import { ShapeOptionsPanel } from './ShapeOptionsPanel';
import { ImageOptionsPanel } from './ImageOptionsPanel';
import { TextOptionsPanel } from './TextOptionsPanel';
import { SignatureListPanel } from './SignatureListPanel';
import { ShapeObject, ImageObject, TextObject } from '../../types/editPageTypes';

type RightSidebarProps = {
    files: PdfFile[];
    selectedFileId: string | null;
    onRemoveFile: (id: string) => void;
    onAddFiles: (files: FileList | null) => void;
    currentPage: number;
    onGoToPage: (page: number) => void;
    onPageAction: (action: 'delete' | 'duplicate' | 'rotate', fileId: string, pageNumber: number) => void;
    pageRotations: Record<number, number>;
    selectedShape?: ShapeObject;
    onShapePropertyChange: (props: Partial<ShapeObject>) => void;
    selectedImage?: ImageObject;
    onImagePropertyChange: (props: Partial<ImageObject>) => void;
    selectedText?: TextObject;
    onTextPropertyChange: (property: keyof TextObject, value: any) => void;
    baseView: 'files' | 'signatures';
    onBaseViewChange: (view: 'files' | 'signatures') => void;
    savedSignatures: string[];
    onAddSavedSignature: (signature: string) => void;
    onOpenSignatureModal: () => void;
    onDeleteSavedSignature: (index: number) => void;
};

export const RightSidebar = (props: RightSidebarProps) => {
    const { 
        selectedShape, onShapePropertyChange, 
        selectedImage, onImagePropertyChange, 
        selectedText, onTextPropertyChange,
        baseView, onBaseViewChange,
        savedSignatures, onAddSavedSignature, onOpenSignatureModal, onDeleteSavedSignature,
        ...fileThumbnailListProps 
    } = props;

    if (selectedShape) {
        return (
            <ShapeOptionsPanel
                shape={selectedShape}
                onUpdate={onShapePropertyChange}
            />
        );
    }
    
    if (selectedImage) {
        return (
            <ImageOptionsPanel
                image={selectedImage}
                onUpdate={onImagePropertyChange}
            />
        );
    }

    if (selectedText) {
        return (
            <TextOptionsPanel
                textObject={selectedText}
                onUpdate={onTextPropertyChange}
            />
        );
    }

    if (baseView === 'signatures') {
        return (
            <SignatureListPanel
                savedSignatures={savedSignatures}
                onAddSignature={onAddSavedSignature}
                onGoBack={() => onBaseViewChange('files')}
                onNewSignature={onOpenSignatureModal}
                onDeleteSignature={onDeleteSavedSignature}
            />
        );
    }

    return <FileThumbnailList {...fileThumbnailListProps} />;
};