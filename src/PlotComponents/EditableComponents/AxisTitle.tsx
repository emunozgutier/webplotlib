import React, { useState } from 'react';
import { EditableArea } from '../EditableArea';

interface AxisTitleProps {
  initialText?: string;
  onTextChange?: (newText: string) => void;
  onOpenConfig?: () => void;
  orientation?: 'horizontal' | 'vertical';
}

export const AxisTitle: React.FC<AxisTitleProps> = ({ 
  initialText = 'Axis Title', 
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

  const commonStyle: React.CSSProperties = {
    font: 'bold 14px Arial',
    color: '#555',
    padding: '4px 8px',
    textAlign: 'center',
    boxSizing: 'border-box',
    // writing-mode perfectly fixes the bounding box for vertical layouts!
    writingMode: isVertical ? 'vertical-rl' : 'horizontal-tb',
    // We rotate 180deg so the text reads bottom-to-top as is standard for Y axes
    transform: isVertical ? 'rotate(180deg)' : 'none',
  };

  return (
    <EditableArea onSettingsClick={() => onOpenConfig?.()}>
      {/* Invisible placeholder ensures the axis container doesn't collapse and shift the plot when editing */}
      {isEditing && (
        <div
          style={{
            ...commonStyle,
            visibility: 'hidden',
            minWidth: isVertical ? 'auto' : '80px',
            minHeight: isVertical ? '80px' : 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </div>
      )}

      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            ...commonStyle,
            // Override the vertical styling during edit mode so the user types normally
            writingMode: 'horizontal-tb',
            border: '1px solid #0052cc',
            background: '#fff',
            minWidth: '150px',
            minHeight: 'auto',
            // Float it perfectly centered without shifting layout
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 100
          }}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{
            ...commonStyle,
            cursor: 'text',
            minWidth: isVertical ? 'auto' : '80px',
            minHeight: isVertical ? '80px' : 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </div>
      )}
    </EditableArea>
  );
};
