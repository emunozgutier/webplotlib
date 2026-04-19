import React from 'react';
import { ConfigPopUp } from '../ConfigPopUp';

export interface AxisConfigData {
  min: number | '';
  max: number | '';
  ticks: number | '';
}

interface AxisConfigProps {
  axisName?: string;
  config: AxisConfigData;
  onConfigChange: (newConfig: AxisConfigData) => void;
  onClose: () => void;
}

export const AxisConfig: React.FC<AxisConfigProps> = ({ 
  axisName = 'Axis', 
  config, 
  onConfigChange, 
  onClose 
}) => {
  const handleChange = (field: keyof AxisConfigData, value: string) => {
    // Convert to number unless it's empty string
    const parsed = value === '' ? '' : Number(value);
    onConfigChange({ ...config, [field]: parsed });
  };

  return (
    <ConfigPopUp title={`${axisName} Settings`} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold', color: '#444' }}>
            Minimum Value
          </label>
          <input
            type="number"
            value={config.min}
            onChange={(e) => handleChange('min', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold', color: '#444' }}>
            Maximum Value
          </label>
          <input
            type="number"
            value={config.max}
            onChange={(e) => handleChange('max', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold', color: '#444' }}>
            Tick Count
          </label>
          <input
            type="number"
            value={config.ticks}
            onChange={(e) => handleChange('ticks', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
    </ConfigPopUp>
  );
};
