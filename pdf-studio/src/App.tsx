
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { FileUpload } from './components/FileUpload';
import { ToolPage } from './pages/ToolPage';
import { EditPage } from './pages/EditPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { HomePage } from './pages/HomePage';
import { Tool, PdfFile, ToolID } from './types';
import { usePdfHandler } from './hooks/usePdfHandler';
import { useLanguage } from './contexts/LanguageContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { ICONS } from './components/Icons';

type ProcessingResult = { blob: Blob; filename: string };

export const App = () => {
    const [activeToolId, setActiveToolId] = useState<ToolID>('home');
    const [activeSubTool, setActiveSubTool] = useState<string | null>(null);
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [isShowingLoader, setIsShowingLoader] = useState(false);
    const [processingState, setProcessingState] = useState<{
        active: boolean;
        toolId: ToolID | null;
        subTool: string | null;
        result: ProcessingResult | null;
    }>({ active: false, toolId: null, subTool: null, result: null });

    const [isEditDirty, setIsEditDirty] = useState(false);
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [pendingNav, setPendingNav] = useState<{ type: 'select' | 'switch', toolId: ToolID, subTool?: string, file?: PdfFile } | null>(null);

    const { generatePreview, convertImageToPdf, mergePdfs } = usePdfHandler();
    const { t } = useLanguage();

    const executeToolSelect = useCallback((toolId: ToolID, subTool?: string) => {
        setFiles([]);
        setActiveToolId(toolId);
        setActiveSubTool(subTool || null);
        setProcessingState({ active: false, toolId: null, subTool: null, result: null });
        setIsEditDirty(false);
    }, []);

    const executeSwitchTool = useCallback((toolId: ToolID, file: PdfFile) => {
        setActiveToolId(toolId);
        setActiveSubTool(null);
        setFiles([file]);
        setProcessingState({ active: false, toolId: null, subTool: null, result: null });
        setIsEditDirty(false);
    }, []);

    const handleToolSelect = useCallback((toolId: ToolID, subTool?: string) => {
        if ((activeToolId === 'edit' || activeToolId === 'watermark') && isEditDirty) {
            setPendingNav({ type: 'select', toolId, subTool });
            setShowUnsavedModal(true);
            return;
        }

        executeToolSelect(toolId, subTool);
    }, [activeToolId, isEditDirty, executeToolSelect]);

    const handleSwitchToolWithFile = useCallback((toolId: ToolID, file: PdfFile) => {
        if ((activeToolId === 'edit' || activeToolId === 'watermark') && isEditDirty) {
            setPendingNav({ type: 'switch', toolId, file });
            setShowUnsavedModal(true);
            return;
        }
        executeSwitchTool(toolId, file);
    }, [activeToolId, isEditDirty, executeSwitchTool]);

    const confirmUnsavedNavigation = () => {
        if (pendingNav?.type === 'select') {
            executeToolSelect(pendingNav.toolId, pendingNav.subTool);
        } else if (pendingNav?.type === 'switch' && pendingNav.file) {
            executeSwitchTool(pendingNav.toolId, pendingNav.file);
        }
        setShowUnsavedModal(false);
        setPendingNav(null);
    };

    const cancelUnsavedNavigation = () => {
        setShowUnsavedModal(false);
        setPendingNav(null);
    };

    const handleRemoveFile = useCallback((idToRemove: string) => {
        setFiles(prev => prev.filter(f => f.id !== idToRemove));
    }, []);

    const handleUpdateFile = useCallback(async (fileId: string, newFile: File) => {
        const newId = `${newFile.name}-${newFile.size}-${Date.now()}`;
        const placeholder: PdfFile = {
            id: newId,
            file: newFile,
            previewUrl: '',
            pageCount: 0,
            isLoading: true,
        };
        setFiles([placeholder]);

        const result = await generatePreview(newFile);
        if (result) {
            setFiles([{ ...result, id: newId, isLoading: false }]);
        } else {
            handleRemoveFile(newId);
            alert(t('alert.updateFileFailed'));
        }
    }, [generatePreview, handleRemoveFile, t]);

    const processFile = useCallback(async (file: File) => {
        const id = `${file.name}-${file.size}`;

        if (file.type.startsWith('image/')) {
            if (activeToolId === 'merge') {
                const convertedFile = await convertImageToPdf(file);
                if (convertedFile) {
                    const result = await generatePreview(convertedFile);
                    if (result) {
                        setFiles(prev => prev.map(f => (f.id === id ? { ...result, file: convertedFile, id: f.id, isLoading: false } : f)));
                    } else {
                        setFiles(prev => prev.filter(f => f.id !== id));
                    }
                } else {
                    setFiles(prev => prev.filter(f => f.id !== id));
                }
            } else {
                const previewUrl = URL.createObjectURL(file);
                const result: Omit<PdfFile, 'isLoading'> = {
                    id: id,
                    file: file,
                    previewUrl: previewUrl,
                    pageCount: 1,
                };
                setFiles(prev => prev.map(f => (f.id === id ? { ...result, id: f.id, isLoading: false } : f)));
            }
        } else if (file.type === 'application/pdf') {
            const result = await generatePreview(file);
            if (result) {
                setFiles(prev => prev.map(f => (f.id === id) ? { ...result, isLoading: false } : f));
            } else {
                setFiles(prev => prev.filter(f => f.id !== id));
            }
        } else {
            const result: Omit<PdfFile, 'isLoading'> = {
                id: id,
                file: file,
                pageCount: 0,
            };
            setFiles(prev => prev.map(f => (f.id === id ? { ...result, id: f.id, isLoading: false } : f)));
        }
    }, [generatePreview, convertImageToPdf, activeToolId]);


    const handleFilesSelect = useCallback(async (selectedFiles: FileList | null) => {
        if (!selectedFiles || selectedFiles.length === 0) return;

        if (['merge', 'split', 'compress', 'convert'].includes(activeToolId)) {
            setIsShowingLoader(true);
        }

        let filesToAdd: File[] = Array.from(selectedFiles);

        if (activeToolId === 'edit' || activeToolId === 'watermark') {
            const pdfFiles = filesToAdd.filter(file => file.type === 'application/pdf');
            if (pdfFiles.length !== filesToAdd.length) {
                alert(t('alert.editOnlyPdf'));
            }
            if (pdfFiles.length === 0) return;

            const currentFile = files.length > 0 ? files[0] : null;
            const allFilesToMerge = currentFile ? [currentFile.file, ...pdfFiles] : pdfFiles;

            if (allFilesToMerge.length === 1 && !currentFile) {
                const file = allFilesToMerge[0];
                const fileId = `${file.name}-${file.size}`;
                const placeholder: PdfFile = { id: fileId, file, previewUrl: '', pageCount: 0, isLoading: true, };
                setFiles([placeholder]);
                processFile(file);
            } else {
                const mergedBytes = await mergePdfs(allFilesToMerge);
                if (mergedBytes) {
                    const newFileName = currentFile?.file.name || 'document.pdf';
                    const mergedFile = new File([mergedBytes], newFileName, { type: 'application/pdf' });
                    if (currentFile) {
                        handleUpdateFile(currentFile.id, mergedFile);
                    } else {
                        const fileId = `${mergedFile.name}-${mergedFile.size}-${Date.now()}`;
                        const placeholder: PdfFile = { id: fileId, file: mergedFile, previewUrl: '', pageCount: 0, isLoading: true, };
                        setFiles([placeholder]);
                        processFile(mergedFile);
                    }
                }
            }
            return;
        }

        if (activeToolId === 'merge') {
            const supportedFiles = filesToAdd.filter(file => file.type === 'application/pdf' || file.type.startsWith('image/'));
            if (supportedFiles.length !== filesToAdd.length) {
                alert(t('alert.mergeSupportedFiles'));
            }
            filesToAdd = supportedFiles;
        } else if (['split', 'compress'].includes(activeToolId)) {
            const pdfFiles = filesToAdd.filter(file => file.type === 'application/pdf');
            if (pdfFiles.length !== filesToAdd.length) {
                alert(t('alert.toolOnlyPdf'));
            }
            filesToAdd = pdfFiles;
        }

        if (filesToAdd.length === 0) return;

        if (activeToolId !== 'merge') {
            const file = filesToAdd[0];
            const fileId = `${file.name}-${file.size}`;

            const placeholder: PdfFile = {
                id: fileId,
                file,
                previewUrl: '',
                pageCount: 0,
                isLoading: true,
            };
            setFiles([placeholder]);
            processFile(file);
        } else {
            const newPlaceholders: PdfFile[] = filesToAdd
                .filter(file => !files.some(f => f.id === `${file.name}-${file.size}`))
                .map(file => ({
                    id: `${file.name}-${file.size}`,
                    file,
                    previewUrl: '',
                    pageCount: 0,
                    isLoading: true,
                }));

            if (newPlaceholders.length > 0) {
                setFiles(prev => [...prev, ...newPlaceholders]);
                newPlaceholders.forEach(pf => processFile(pf.file));
            }
        }
    }, [activeToolId, files, mergePdfs, handleUpdateFile, processFile, t]);

    const handleReorderFiles = (dragIndex: number, hoverIndex: number) => {
        setFiles(prevFiles => {
            const newFiles = [...prevFiles];
            const [draggedItem] = newFiles.splice(dragIndex, 1);
            newFiles.splice(hoverIndex, 0, draggedItem);
            return newFiles;
        });
    };

    const handleLoadingComplete = useCallback(() => {
        setIsShowingLoader(false);
    }, []);

    const handleProcessStart = useCallback(async (
        processFn: () => Promise<ProcessingResult | null>,
        toolId: ToolID,
        subTool?: string
    ) => {
        setProcessingState({ active: true, toolId, subTool: subTool || null, result: null });
        const startTime = Date.now();

        try {
            const result = await processFn();
            const duration = Date.now() - startTime;
            const minDuration = 3000;

            if (duration < minDuration) {
                await new Promise(resolve => setTimeout(resolve, minDuration - duration));
            }

            if (result) {
                setProcessingState(prev => ({ ...prev, result }));
            } else {
                alert(t('alert.processingFailed'));
                setProcessingState({ active: false, toolId: null, subTool: null, result: null });
            }
        } catch (error) {
            console.error("Processing failed:", error);
            alert(t('alert.processingFailed'));
            setProcessingState({ active: false, toolId: null, subTool: null, result: null });
        }
    }, [t]);

    const handleResetProcess = useCallback(() => {
        setFiles([]);
        setProcessingState({ active: false, toolId: null, subTool: null, result: null });
    }, []);


    const renderContent = () => {
        if (activeToolId === 'home') {
            return <HomePage onToolSelect={handleToolSelect} />;
        }

        if (processingState.active && processingState.toolId) {
            return <ProcessingPage
                toolId={processingState.toolId}
                subTool={processingState.subTool || activeSubTool}
                result={processingState.result}
                onReset={handleResetProcess}
            />;
        }

        if (isShowingLoader) {
            return (
                <main className="flex-grow flex items-center justify-center bg-white">
                    <LoadingScreen onComplete={handleLoadingComplete} />
                </main>
            );
        }

        if (files.length === 0) {
            return (
                <main className="flex-grow flex p-8 items-center justify-center">
                    <FileUpload onFilesSelect={handleFilesSelect} activeTool={activeToolId} activeSubTool={activeSubTool} />
                </main>
            );
        }

        if (activeToolId === 'edit' || activeToolId === 'watermark') {
            return <EditPage
                activeToolId={activeToolId}
                files={files}
                onRemoveFile={handleRemoveFile}
                onAddFiles={handleFilesSelect}
                onUpdateFile={handleUpdateFile}
                onSwitchTool={handleSwitchToolWithFile}
                onDirtyChange={setIsEditDirty}
            />;
        }

        return <ToolPage
            files={files}
            activeToolId={activeToolId}
            activeSubTool={activeSubTool}
            onRemoveFile={handleRemoveFile}
            onAddFiles={handleFilesSelect}
            onReorderFiles={handleReorderFiles}
            onProcessStart={handleProcessStart}
        />;
    };

    return (
        <div className="flex flex-col w-screen h-screen">

            <div className="flex flex-grow min-h-0">
                <Sidebar activeTool={activeToolId} onToolSelect={handleToolSelect} />
                {renderContent()}
            </div>

            {showUnsavedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-5">
                            <span className="h-8 w-8 text-blue-600">{ICONS.info}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-4 text-center text-slate-900">{t('editPage.modal.title')}</h3>
                        <p className="text-slate-600 mb-6 text-center">{t('alert.unsavedChanges')}</p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={cancelUnsavedNavigation}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded font-semibold border border-slate-300"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={confirmUnsavedNavigation}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-md"
                            >
                                {t('common.confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
