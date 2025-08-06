import { useMutation, useQuery } from '@tanstack/react-query';

import { locationService } from './locationService';

const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const FIVE_MINUTES_MS = 5 * SECONDS_IN_MINUTE * MS_IN_SECOND;

// Hook for getting current position (simple GPS request)
export const useCurrentPosition = (enabled = true) => {
  return useQuery({
    enabled,
    queryFn: () => locationService.getCurrentPosition(),
    queryKey: ['location', 'currentPosition'],
    retry: false, // Don't retry - we handle permission flow manually
    staleTime: FIVE_MINUTES_MS,
  });
};

// Hook for full location flow (request -> permission -> settings -> fallback)
export const useLocationFlow = () => {
  return useMutation({
    mutationFn: async () => {
      return await locationService.requestLocationWithFlow();
    },
    mutationKey: ['location', 'fullFlow'],
    onError: (error) => {
      console.error('useLocationFlow: onError callback:', error);
    },
    onSuccess: (data) => {
      console.warn('useLocationFlow: onSuccess callback:', data);
    },
  });
};
