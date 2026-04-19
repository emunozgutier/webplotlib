import React from 'react';

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
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      width: '250px',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '14px' }}>Title Settings</h3>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 4px' }}
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', fontWeight: 'bold' }}>
          Plot Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  );
};
