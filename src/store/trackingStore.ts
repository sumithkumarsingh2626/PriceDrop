import { create } from 'zustand';

interface TrackingUiState {
  searchQuery: string;
  statusFilter: 'all' | 'active' | 'paused';
  isAddProductOpen: boolean;
  setSearchQuery: (value: string) => void;
  setStatusFilter: (value: 'all' | 'active' | 'paused') => void;
  setAddProductOpen: (open: boolean) => void;
}

export const useTrackingStore = create<TrackingUiState>((set) => ({
  searchQuery: '',
  statusFilter: 'all',
  isAddProductOpen: false,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setAddProductOpen: (isAddProductOpen) => set({ isAddProductOpen }),
}));
