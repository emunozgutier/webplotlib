import React from 'react';

interface ConfigPopUpProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ConfigPopUp: React.FC<ConfigPopUpProps> = ({ title, onClose, children }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div 
        style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          minWidth: '320px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it if we add backdrop close later
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{title || 'Configuration'}</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '24px', 
              lineHeight: '1',
              padding: '0 4px', 
              color: '#888' 
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
