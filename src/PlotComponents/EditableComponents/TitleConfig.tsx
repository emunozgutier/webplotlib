import React from 'react';
import { ConfigPopUp } from '../ConfigPopUp';

interface TitleConfigProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onClose: () => void;
}

export const TitleConfig: React.FC<TitleConfigProps> = ({ 
  title, 
  onTitleChange, 
  onClose 
}) => {
  return (
    <ConfigPopUp title="Title Settings" onClose={onClose}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold', color: '#444' }}>
          Plot Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: '14px'
          }}
          autoFocus
        />
      </div>
    </ConfigPopUp>
  );
};
