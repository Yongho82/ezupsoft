
import { useState, useCallback } from 'react';
import { PageState, NormalizedLine, TextObject, ImageObject, ShapeObject, PageObjects } from '../types/editPageTypes';

export const usePageObjects = (initialState?: PageObjects) => {
    const [drawingsByPage, setDrawingsByPage] = useState<Record<number, NormalizedLine[]>>(initialState?.drawingsByPage || {});
    const [textObjectsByPage, setTextObjectsByPage] = useState<Record<number, TextObject[]>>(initialState?.textObjectsByPage || {});
    const [imageObjectsByPage, setImageObjectsByPage] = useState<Record<number, ImageObject[]>>(initialState?.imageObjectsByPage || {});
    const [shapeObjectsByPage, setShapeObjectsByPage] = useState<Record<number, ShapeObject[]>>(initialState?.shapeObjectsByPage || {});

    const [historyByPage, setHistoryByPage] = useState<Record<number, { undo: PageState[], redo: PageState[] }>>({});

    const recordHistory = useCallback((pageNumber: number, currentState: PageState) => {
        setHistoryByPage(prev => {
            const pageHistory = prev[pageNumber] || { undo: [], redo: [] };
            const lastUndoState = pageHistory.undo[pageHistory.undo.length - 1];
            if (JSON.stringify(lastUndoState) === JSON.stringify(currentState)) {
                return prev;
            }
            return {
                ...prev,
                [pageNumber]: {
                    undo: [...pageHistory.undo, currentState],
                    redo: []
                }
            };
        });
    }, []);
    
    const getCurrentPageState = useCallback((pageNumber: number): PageState => {
        return {
            drawings: drawingsByPage[pageNumber] || [],
            textObjects: textObjectsByPage[pageNumber] || [],
            imageObjects: imageObjectsByPage[pageNumber] || [],
            shapeObjects: shapeObjectsByPage[pageNumber] || [],
        };
    }, [drawingsByPage, textObjectsByPage, imageObjectsByPage, shapeObjectsByPage]);
    
    const applyPageState = (pageNumber: number, state: PageState) => {
        setDrawingsByPage(prev => ({ ...prev, [pageNumber]: state.drawings }));
        setTextObjectsByPage(prev => ({ ...prev, [pageNumber]: state.textObjects }));
        setImageObjectsByPage(prev => ({ ...prev, [pageNumber]: state.imageObjects }));
        setShapeObjectsByPage(prev => ({ ...prev, [pageNumber]: state.shapeObjects }));
    };

    const handleUndo = useCallback((pageNumber: number) => {
        const pageHistory = historyByPage[pageNumber];
        if (!pageHistory || pageHistory.undo.length === 0) return;

        const lastState = pageHistory.undo[pageHistory.undo.length - 1];
        const newUndoStack = pageHistory.undo.slice(0, -1);
        
        const currentState = getCurrentPageState(pageNumber);

        setHistoryByPage(prev => ({
            ...prev,
            [pageNumber]: { undo: newUndoStack, redo: [...pageHistory.redo, currentState] }
        }));

        applyPageState(pageNumber, lastState);
        return true;
    }, [historyByPage, getCurrentPageState]);
    
    const handleRedo = useCallback((pageNumber: number) => {
        const pageHistory = historyByPage[pageNumber];
        if (!pageHistory || pageHistory.redo.length === 0) return;

        const nextState = pageHistory.redo[pageHistory.redo.length - 1];
        const newRedoStack = pageHistory.redo.slice(0, -1);
        
        const currentState = getCurrentPageState(pageNumber);
        
        setHistoryByPage(prev => ({
            ...prev,
            [pageNumber]: { undo: [...pageHistory.undo, currentState], redo: newRedoStack }
        }));
        
        applyPageState(pageNumber, nextState);
        return true;
    }, [historyByPage, getCurrentPageState]);

    const resetPageObjects = useCallback((pageNumber: number) => {
        const currentState = getCurrentPageState(pageNumber);
        // FIX: Explicitly type `arr` as an array to resolve 'unknown' type error on `length` property.
        if (Object.values(currentState).every((arr: unknown) => Array.isArray(arr) && arr.length === 0)) return;

        recordHistory(pageNumber, currentState);
        applyPageState(pageNumber, { drawings: [], textObjects: [], imageObjects: [], shapeObjects: [] });
    }, [getCurrentPageState, recordHistory]);
    
    const addObject = useCallback(<T extends NormalizedLine | TextObject | ImageObject | ShapeObject>(pageNumber: number, objectType: 'drawing' | 'text' | 'image' | 'shape', newObject: T) => {
        const currentState = getCurrentPageState(pageNumber);
        recordHistory(pageNumber, currentState);

        if (objectType === 'drawing') setDrawingsByPage(prev => ({ ...prev, [pageNumber]: [...(prev[pageNumber] || []), newObject as NormalizedLine] }));
        if (objectType === 'text') setTextObjectsByPage(prev => ({ ...prev, [pageNumber]: [...(prev[pageNumber] || []), newObject as TextObject] }));
        if (objectType === 'image') setImageObjectsByPage(prev => ({ ...prev, [pageNumber]: [...(prev[pageNumber] || []), newObject as ImageObject] }));
        if (objectType === 'shape') setShapeObjectsByPage(prev => ({ ...prev, [pageNumber]: [...(prev[pageNumber] || []), newObject as ShapeObject] }));
    }, [getCurrentPageState, recordHistory]);

    const updateObject = useCallback((pageNumber: number, objectId: string, objectType: 'drawing' | 'text' | 'image' | 'shape', props: Partial<NormalizedLine | TextObject | ImageObject | ShapeObject>) => {
         if (objectType === 'drawing') setDrawingsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.map(d => d.id === objectId ? { ...d, ...props } : d) }));
         if (objectType === 'text') setTextObjectsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.map(t => t.id === objectId ? { ...t, ...props } : t) }));
         if (objectType === 'image') setImageObjectsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.map(i => i.id === objectId ? { ...i, ...props } : i) }));
         if (objectType === 'shape') setShapeObjectsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.map(s => s.id === objectId ? { ...s, ...props } : s) }));
    }, []);
    
    const deleteObject = useCallback((pageNumber: number, objectId: string, objectType: 'drawing' | 'text' | 'image' | 'shape') => {
        const currentState = getCurrentPageState(pageNumber);
        recordHistory(pageNumber, currentState);

        if (objectType === 'drawing') setDrawingsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.filter(d => d.id !== objectId) }));
        if (objectType === 'text') setTextObjectsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.filter(t => t.id !== objectId) }));
        if (objectType === 'image') setImageObjectsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.filter(i => i.id !== objectId) }));
        if (objectType === 'shape') setShapeObjectsByPage(prev => ({ ...prev, [pageNumber]: prev[pageNumber]?.filter(s => s.id !== objectId) }));
    }, [getCurrentPageState, recordHistory]);
    
    const resetAllObjects = useCallback(() => {
        setDrawingsByPage({});
        setTextObjectsByPage({});
        setImageObjectsByPage({});
        setShapeObjectsByPage({});
        setHistoryByPage({});
    }, []);

    const canUndo = (pageNumber: number) => (historyByPage[pageNumber]?.undo.length || 0) > 0;
    const canRedo = (pageNumber: number) => (historyByPage[pageNumber]?.redo.length || 0) > 0;

    // FIX: Explicitly cast Object.values to correct type to avoid 'unknown' error on 'undo' property
    const isDirty = (Object.values(historyByPage) as { undo: PageState[] }[]).some(h => h.undo.length > 0);
    
    return {
        drawingsByPage,
        textObjectsByPage,
        imageObjectsByPage,
        shapeObjectsByPage,
        addObject,
        updateObject,
        deleteObject,
        handleUndo,
        handleRedo,
        resetPageObjects,
        resetAllObjects,
        recordHistory,
        getCurrentPageState,
        canUndo,
        canRedo,
        isDirty,
    };
};
