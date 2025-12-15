import React, { useState, useEffect } from 'react';

interface EditPopupProps {
  text: string;
  onUpdate: (newText: string) => void;
  position: { top: number; left: number };
}

export const EditPopup: React.FC<EditPopupProps> = ({ text, onUpdate, position }) => {
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleUpdateClick = () => {
    onUpdate(editedText);
  };

  return (
    <div
      className="absolute bg-white rounded-lg shadow-2xl p-2 z-30 flex items-end gap-2"
      style={{ top: position.top, left: position.left, transform: 'translateY(8px)' }}
    >
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className="w-[280px] h-20 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUpdateClick();
          }
        }}
        autoFocus
      />
      <button
        onClick={handleUpdateClick}
        className="w-8 h-8 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        title="Update Text"
      />
    </div>
  );
};
