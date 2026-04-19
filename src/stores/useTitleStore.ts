import { create } from 'zustand';

export interface TitleState {
  title: string;
  setTitle: (title: string) => void;
}

export const useTitleStore = create<TitleState>((set) => ({
  title: 'Sine Wave Example',
  setTitle: (title) => set({ title }),
}));
