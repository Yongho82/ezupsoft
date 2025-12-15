import React from 'react';
import { ShapeType } from './ShapesDropdown';
import { ICONS } from '../Icons';

type CheckmarkDropdownProps = {
    onShapeSelect: (shapeType: ShapeType) => void;
};

const StampButton = ({ text, color, onClick }: { text: string, color: string, onClick: () => void }) => (
    <button 
        onClick={onClick} 
        className="border-2 rounded p-1 text-[10px] font-bold bg-white hover:bg-slate-50 transition-colors w-full h-10 flex items-center justify-center" 
        style={{ borderColor: color, color: color }}
    >
        {text}
    </button>
);

export const CheckmarkDropdown = ({ onShapeSelect }: CheckmarkDropdownProps) => {
    return (
        <div className="absolute top-full mt-1 left-0 bg-white shadow-lg rounded-md border border-slate-200 z-30 p-3 w-80">
            <div className="text-xs font-semibold text-slate-500 mb-2">기호</div>
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => onShapeSelect('checkmark')}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 border border-slate-200"
                >
                    <span className="w-8 h-8 text-green-600">{ICONS.checkmark_tool}</span>
                </button>
                 <button
                    onClick={() => onShapeSelect('crossmark')}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 border border-slate-200"
                >
                    <span className="w-8 h-8 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </button>
            </div>

            <div className="text-xs font-semibold text-slate-500 mb-2">비즈니스 스탬프</div>
            <div className="grid grid-cols-2 gap-2">
                <StampButton text="APPROVED" color="#16a34a" onClick={() => onShapeSelect('stamp-approved')} />
                <StampButton text="REJECTED" color="#dc2626" onClick={() => onShapeSelect('stamp-rejected')} />
                <StampButton text="COMPLETED" color="#16a34a" onClick={() => onShapeSelect('stamp-completed')} />
                <StampButton text="VOID" color="#dc2626" onClick={() => onShapeSelect('stamp-void')} />
                <StampButton text="CONFIDENTIAL" color="#4b5563" onClick={() => onShapeSelect('stamp-confidential')} />
                <StampButton text="DRAFT" color="#4b5563" onClick={() => onShapeSelect('stamp-draft')} />
                <StampButton text="URGENT" color="#dc2626" onClick={() => onShapeSelect('stamp-urgent')} />
                <StampButton text="PAID" color="#16a34a" onClick={() => onShapeSelect('stamp-paid')} />
                <StampButton text="COPY" color="#4b5563" onClick={() => onShapeSelect('stamp-copy')} />
            </div>
        </div>
    );
};