import React, { useState } from 'react';
import { EditableArea } from '../EditableArea';

interface AxisProps {
  initialText?: string;
  onTextChange?: (newText: string) => void;
  onOpenConfig?: () => void;
  orientation?: 'horizontal' | 'vertical'; // Used to possibly rotate the label
}

export const Axis: React.FC<AxisProps> = ({ 
  initialText = 'Axis', 
  onTextChange,
  onOpenConfig,
  orientation = 'horizontal'
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

  const isVertical = orientation === 'vertical';

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
            font: 'bold 14px Arial',
            color: '#555',
            padding: '4px 8px',
            border: '1px solid #0052cc',
            background: '#fff',
            width: '120px',
            textAlign: 'center',
            boxSizing: 'border-box',
            transform: isVertical ? 'rotate(-90deg)' : 'none',
          }}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{
            font: 'bold 14px Arial',
            color: '#555',
            padding: '4px 8px',
            cursor: 'text',
            textAlign: 'center',
            boxSizing: 'border-box',
            minWidth: '80px',
            transform: isVertical ? 'rotate(-90deg)' : 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {text || `${orientation === 'horizontal' ? 'X' : 'Y'} Axis`}
        </div>
      )}
    </EditableArea>
  );
};
