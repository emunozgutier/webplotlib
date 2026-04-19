import { create } from 'zustand';
import { AxisConfigData } from '../PlotComponents/EditableComponents/AxisConfig';

export interface AxisState {
  xLabel: string;
  xConfig: AxisConfigData;
  yLabel: string;
  yConfig: AxisConfigData;
  
  setXLabel: (label: string) => void;
  setXConfig: (config: AxisConfigData) => void;
  setYLabel: (label: string) => void;
  setYConfig: (config: AxisConfigData) => void;
}

export const useAxisStore = create<AxisState>((set) => ({
  xLabel: 'X Axis',
  xConfig: { min: 0, max: 6.28, ticks: 10 },
  
  yLabel: 'Y Axis',
  yConfig: { min: -1, max: 1, ticks: 5 },
  
  setXLabel: (xLabel) => set({ xLabel }),
  setXConfig: (xConfig) => set({ xConfig }),
  setYLabel: (yLabel) => set({ yLabel }),
  setYConfig: (yConfig) => set({ yConfig }),
}));
