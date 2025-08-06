import { create } from 'zustand';

type FeatureFlag = {
  enabled: boolean;
  name: string;
};

type FeatureFlagsActions = {
  disableFeature: (featureName: string) => void;
  enableFeature: (featureName: string) => void;
  isFeatureEnabled: (featureName: string) => boolean;
  resetFeatures: () => void;
  toggleFeature: (featureName: string) => void;
};

type FeatureFlagsState = {
  features: Record<string, FeatureFlag>;
};

const defaultFeatures: Record<string, FeatureFlag> = {
  ANIMATED_BACKGROUNDS: { enabled: true, name: 'Animated Backgrounds' },
  BLUR_EFFECTS: { enabled: true, name: 'Blur Effects' },
  DAILY_FORECAST: { enabled: true, name: 'Daily Forecast' },
  DETAILED_METRICS: { enabled: true, name: 'Detailed Weather Metrics' },
  GRADIENT_BACKGROUNDS: { enabled: true, name: 'Gradient Backgrounds' },
  HOURLY_FORECAST: { enabled: true, name: 'Hourly Forecast' },
  LOCATION_SEARCH: { enabled: true, name: 'Location Search' },
  NOTIFICATIONS: { enabled: false, name: 'Weather Notifications' },
  PARALLAX_EFFECTS: { enabled: true, name: 'Parallax Effects' },
  SEARCH_HISTORY: { enabled: true, name: 'Search History' },
  WEATHER_ALERTS: { enabled: true, name: 'Weather Alerts' },
  WEATHER_MAPS: { enabled: false, name: 'Weather Maps' },
};

export const useFeatureFlagsStore = create<FeatureFlagsActions & FeatureFlagsState>()((set, get) => ({
  disableFeature: (featureName) => {
    const { features } = get();
    set({
      features: {
        ...features,
        [featureName]: { ...features[featureName], enabled: false },
      },
    });
  },

  enableFeature: (featureName) => {
    const { features } = get();
    set({
      features: {
        ...features,
        [featureName]: { ...features[featureName], enabled: true },
      },
    });
  },

  features: defaultFeatures,

  isFeatureEnabled: (featureName) => {
    const { features } = get();
    return features[featureName].enabled;
  },

  resetFeatures: () => {
    set({ features: defaultFeatures });
  },

  toggleFeature: (featureName) => {
    const { features } = get();
    set({
      features: {
        ...features,
        [featureName]: {
          ...features[featureName],
          enabled: !features[featureName].enabled,
        },
      },
    });
  },
}));

export const useFeatureFlag = (featureName: string) => {
  return useFeatureFlagsStore(state => state.isFeatureEnabled(featureName));
};

export const useAnimatedBackgrounds = () => useFeatureFlag('ANIMATED_BACKGROUNDS');
export const useBlurEffects = () => useFeatureFlag('BLUR_EFFECTS');
export const useDailyForecast = () => useFeatureFlag('DAILY_FORECAST');
export const useDetailedMetrics = () => useFeatureFlag('DETAILED_METRICS');
export const useGradientBackgrounds = () => useFeatureFlag('GRADIENT_BACKGROUNDS');
export const useHourlyForecast = () => useFeatureFlag('HOURLY_FORECAST');
export const useLocationSearch = () => useFeatureFlag('LOCATION_SEARCH');
export const useNotifications = () => useFeatureFlag('NOTIFICATIONS');
export const useParallaxEffects = () => useFeatureFlag('PARALLAX_EFFECTS');
export const useSearchHistory = () => useFeatureFlag('SEARCH_HISTORY');
export const useWeatherAlerts = () => useFeatureFlag('WEATHER_ALERTS');
export const useWeatherMaps = () => useFeatureFlag('WEATHER_MAPS');
