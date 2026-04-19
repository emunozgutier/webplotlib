import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Title, TitleConfig, AxisTitle, AxisTitleConfig, newPlot,
  useTitleStore, useAxisStore 
} from '../src';

const DemoApp = () => {
  const plotRef = useRef<HTMLDivElement>(null);
  
  // Zustand Stores for underlying configuration
  const { title, setTitle } = useTitleStore();
  const { 
    xLabel, setXLabel, xConfig, setXConfig, 
    yLabel, setYLabel, yConfig, setYConfig 
  } = useAxisStore();

  // Local state exclusively for UI popover visibility
  const [showTitleConfig, setShowTitleConfig] = useState(false);
  const [showXTitleConfig, setShowXTitleConfig] = useState(false);
  const [showYTitleConfig, setShowYTitleConfig] = useState(false);

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
      
      {showTitleConfig && (
        <TitleConfig 
          title={title} 
          onTitleChange={setTitle} 
          onClose={() => setShowTitleConfig(false)} 
        />
      )}
      {showXTitleConfig && (
        <AxisTitleConfig 
          axisName="Horizontal Axis"
          title={xLabel} 
          onTitleChange={setXLabel} 
          onClose={() => setShowXTitleConfig(false)} 
        />
      )}
      {showYTitleConfig && (
        <AxisTitleConfig 
          axisName="Vertical Axis"
          title={yLabel} 
          onTitleChange={setYLabel} 
          onClose={() => setShowYTitleConfig(false)} 
        />
      )}

      {/* Main Plot Container with surrounding Editable Elements */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        
        {/* Title At Top */}
        <div style={{ marginBottom: '10px' }}>
          <Title 
            initialText={title} 
            onTextChange={setTitle}
            onOpenConfig={() => setShowTitleConfig(true)}
          />
        </div>

        {/* Center Row: Plot Canvas + overlapping Y Axis (Left) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ 
            position: 'absolute', 
            left: '0px', 
            zIndex: 10 
          }}>
            <AxisTitle 
              initialText={yLabel}
              onTextChange={setYLabel}
              onOpenConfig={() => setShowYTitleConfig(true)}
              orientation="vertical"
            />
          </div>
          
          <div ref={plotRef} style={{ width: '800px', height: '400px' }} />
        </div>

        {/* Bottom: X Axis */}
        <div style={{ marginTop: '0px' }}>
          <AxisTitle 
            initialText={xLabel}
            onTextChange={setXLabel}
            onOpenConfig={() => setShowXTitleConfig(true)}
            orientation="horizontal"
          />
        </div>

      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<DemoApp />);
}
