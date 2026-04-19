import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Title, TitleConfig, EditableArea, newPlot } from '../src';

const DemoApp = () => {
  const plotRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("Sine Wave Example");
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (!plotRef.current) return;

    // Generate Sine Wave Data (1,000 points, 1 cycle)
    const x = [];
    const y = [];
    for (let i = 0; i <= 1000; i++) {
        const val = (i / 1000) * 2 * Math.PI; // 1 cycle
        x.push(val);
        y.push(Math.sin(val));
    }

    newPlot(plotRef.current, [
      {
        x,
        y,
        mode: 'lines',
        marker: { color: '#0052cc', size: 2 }
      }
    ], {
      width: 800,
      height: 400,
      margin: { t: 10, r: 10, b: 40, l: 40 }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1 style={{ marginBottom: '40px', color: '#333' }}>React + Webplotlib Components</h1>
      
      {showConfig && (
        <TitleConfig 
          title={title} 
          onTitleChange={setTitle} 
          onClose={() => setShowConfig(false)} 
        />
      )}

      <EditableArea onSettingsClick={() => setShowConfig(true)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          
          <Title 
            initialText={title} 
            onTextChange={setTitle}
            onOpenConfig={() => setShowConfig(true)}
          />

          <div ref={plotRef} style={{ width: '800px', height: '400px' }} />

        </div>
      </EditableArea>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<DemoApp />);
}
