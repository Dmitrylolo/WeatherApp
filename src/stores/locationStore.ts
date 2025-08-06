import type { Position } from '@/hooks/domain/location/types';

import { create } from 'zustand';

type UserLocationActions = {
  clearCurrentPosition: () => void;
  setCurrentPosition: (position: Position | undefined) => void;
};

type UserLocationState = {
  currentPosition: Position | undefined;
};

// Store for user's current location data
// Permissions are handled via hooks, not stored here
export const useUserLocationStore = create<UserLocationActions & UserLocationState>()((set) => ({
  clearCurrentPosition: () => {
    set({ currentPosition: undefined });
  },
  currentPosition: undefined,
  setCurrentPosition: (position) => {
    set({ currentPosition: position });
  },
}));
