import React from 'react';
import { ConfigPopUp } from '../ConfigPopUp';

interface AxisTitleConfigProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onClose: () => void;
  axisName?: string;
}

export const AxisTitleConfig: React.FC<AxisTitleConfigProps> = ({ 
  title, 
  onTitleChange, 
  onClose,
  axisName = 'Axis'
}) => {
  return (
    <ConfigPopUp title={`${axisName} Title Settings`} onClose={onClose}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold', color: '#444' }}>
          Axis Title Text
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
