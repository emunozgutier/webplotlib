import React, { useState, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';

interface EditableAreaProps {
  children: React.ReactNode;
  onSettingsClick: () => void;
  isActive?: boolean;
}

export const EditableArea: React.FC<EditableAreaProps> = ({ 
  children, 
  onSettingsClick,
  isActive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setOrientation(height > width ? 'portrait' : 'landscape');
      }
    };

    checkDimensions();
    const observer = new ResizeObserver(checkDimensions);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const showOutline = isActive || isHovered;

  return (
    <div 
      ref={containerRef}
      className={`editable-area ${showOutline ? 'active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        border: `1px dashed ${showOutline ? '#888' : 'transparent'}`,
        transition: 'border-color 0.2s',
      }}
    >
      {children}
      
      {showOutline && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSettingsClick();
          }}
          style={{
            position: 'absolute',
            ...(orientation === 'landscape' 
              ? { right: '-24px', top: '50%', transform: 'translateY(-50%)' }
              : { bottom: '-24px', left: '50%', transform: 'translateX(-50%)' }
            ),
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            zIndex: 10
          }}
          title="Settings"
        >
          <Settings size={14} color="#555" />
        </button>
      )}
    </div>
  );
};
