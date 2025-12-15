import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export type ShapeType =
  // Lines
  | 'line' | 'line-arrow' | 'line-bi-arrow'
  // Rectangles
  | 'rectangle' | 'rounded-rectangle'
  // Basic Shapes
  | 'oval' | 'triangle' | 'right-triangle' | 'pentagon' | 'hexagon' | 'octagon' | 'cross' | 'heart' | 'star-5'
  // Block Arrows
  | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down'
  // Stamps - Symbols
  | 'checkmark' | 'crossmark'
  // Stamps - Business
  | 'stamp-approved' | 'stamp-rejected' | 'stamp-completed' | 'stamp-confidential' 
  | 'stamp-draft' | 'stamp-urgent' | 'stamp-copy' | 'stamp-void' | 'stamp-paid';

type ShapeDefinition = {
    type: ShapeType;
    icon: React.ReactNode;
};

type ShapeButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

const ShapeButton: React.FC<ShapeButtonProps> = ({ onClick, children }) => (
    <button onClick={onClick} className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 transition-colors">
        {children}
    </button>
);

const SHAPES: Record<string, ShapeDefinition[]> = {
    'shapes.lines': [
        { type: 'line', icon: <svg viewBox="0 0 24 24"><path d="M4 12 L20 12" stroke="currentColor" strokeWidth="2"/></svg> },
        { type: 'line-arrow', icon: <svg viewBox="0 0 24 24"><path d="M4 12 L20 12 M14 6 L20 12 L14 18" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'line-bi-arrow', icon: <svg viewBox="0 0 24 24"><path d="M4 12 L20 12 M10 6 L4 12 L10 18 M14 6 L20 12 L14 18" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
    ],
    'shapes.rectangles': [
        { type: 'rectangle', icon: <svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'rounded-rectangle', icon: <svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
    ],
    'shapes.basic': [
        { type: 'oval', icon: <svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="8" ry="6" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'triangle', icon: <svg viewBox="0 0 24 24"><path d="M12 4 L20 20 L4 20 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'right-triangle', icon: <svg viewBox="0 0 24 24"><path d="M4 4 L4 20 L20 20 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'pentagon', icon: <svg viewBox="0 0 24 24"><path d="M12 4 L20 10 L16 20 L8 20 L4 10 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'hexagon', icon: <svg viewBox="0 0 24 24"><path d="M18 6 L6 6 L2 12 L6 18 L18 18 L22 12 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'octagon', icon: <svg viewBox="0 0 24 24"><path d="M9 4 L15 4 L20 9 L20 15 L15 20 L9 20 L4 15 L4 9 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'cross', icon: <svg viewBox="0 0 24 24"><path d="M9 4 H15 V9 H20 V15 H15 V20 H9 V15 H4 V9 H9 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'heart', icon: <svg viewBox="0 0 24 24"><path d="M12 20.5 C12 20.5 4 15 4 9 C4 6 6 4 9 4 C11 4 12 6 12 6 C12 6 13 4 15 4 C18 4 20 6 20 9 C20 15 12 20.5 12 20.5 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'star-5', icon: <svg viewBox="0 0 24 24"><path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
    ],
    'shapes.blockArrows': [
        { type: 'arrow-right', icon: <svg viewBox="0 0 24 24"><path d="M4 10 H16 V6 L22 12 L16 18 V14 H4 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'arrow-left', icon: <svg viewBox="0 0 24 24"><path d="M20 10 H8 V6 L2 12 L8 18 V14 H20 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'arrow-up', icon: <svg viewBox="0 0 24 24"><path d="M14 20 V8 H18 L12 2 L6 8 H10 V20 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
        { type: 'arrow-down', icon: <svg viewBox="0 0 24 24"><path d="M14 4 V16 H18 L12 22 L6 16 H10 V4 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg> },
    ],
};

export const ShapesDropdown = ({ onShapeSelect }: { onShapeSelect: (shapeType: ShapeType) => void }) => {
    const { t } = useLanguage();

    return (
        <div className="absolute top-full mt-1 left-0 bg-white shadow-lg rounded-md border border-slate-200 z-30 p-2 w-96 max-h-96 overflow-y-auto">
            {Object.entries(SHAPES).map(([categoryKey, shapes]) => (
                <div key={categoryKey}>
                    <div className="text-xs text-slate-500 font-semibold px-2 py-1 border-b border-slate-200 mb-1">{t(categoryKey)}</div>
                    <div className="grid grid-cols-10 gap-1 p-1">
                        {shapes.map(shape => (
                            <ShapeButton key={shape.type} onClick={() => onShapeSelect(shape.type)}>
                                {shape.icon}
                            </ShapeButton>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};