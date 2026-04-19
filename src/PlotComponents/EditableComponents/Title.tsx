import React, { useState } from 'react';
import { EditableArea } from '../EditableArea';

interface TitleProps {
  initialText: string;
  onTextChange?: (newText: string) => void;
  onOpenConfig?: () => void;
}

export const Title: React.FC<TitleProps> = ({ 
  initialText, 
  onTextChange,
  onOpenConfig 
}) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    if (text !== initialText) {
      onTextChange?.(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    }
  };

  return (
    <EditableArea onSettingsClick={() => onOpenConfig?.()}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            font: 'bold 16px Arial',
            color: '#333',
            padding: '4px 8px',
            border: '1px solid #0052cc',
            background: '#fff',
            width: '100%',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{
            font: 'bold 16px Arial',
            color: '#333',
            padding: '4px 8px',
            cursor: 'text',
            textAlign: 'center',
            boxSizing: 'border-box',
            minWidth: '100px'
          }}
        >
          {text || 'Plot Title'}
        </div>
      )}
    </EditableArea>
  );
};
