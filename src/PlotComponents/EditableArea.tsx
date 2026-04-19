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
        // Optional: Ensure the wrapper itself can participate in z-index sorting properly
        zIndex: showOutline ? 100 : 1
      }}
    >
      {children}
      
      {showOutline && (
        <>
          {/* Invisible pad extended around the element to catch sloppy mouse movements so hover state isn't lost */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            right: orientation === 'landscape' ? '-50px' : '-20px',
            bottom: orientation === 'portrait' ? '-50px' : '-20px',
            zIndex: -1
          }} />

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
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              zIndex: 10
            }}
            title="Settings"
          >
            <Settings size={16} color="#555" />
          </button>
        </>
      )}
    </div>
  );
};
