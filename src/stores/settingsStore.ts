import { create } from 'zustand';

type SettingsActions = {
  resetSettings: () => void;
  updateSettings: (updates: Partial<WeatherSettings>) => void;
};

type SettingsState = {
  settings: WeatherSettings;
};

type WeatherSettings = {
  enableNotifications: boolean;
  notificationTime: string; // Format: "HH:mm"
  pressureUnit: 'hPa' | 'inHg' | 'mmHg';
  showDailyForecast: boolean;
  showFeelsLike: boolean;
  showHourlyForecast: boolean;
  showHumidity: boolean;
  showPressure: boolean;
  showUVIndex: boolean;
  showVisibility: boolean;
  showWindSpeed: boolean;
  temperatureUnit: 'celsius' | 'fahrenheit';
  timeFormat: '12h' | '24h';
  visibilityUnit: 'km' | 'miles';
  windSpeedUnit: 'kmh' | 'mph' | 'ms';
};

const defaultSettings: WeatherSettings = {
  enableNotifications: false,
  notificationTime: '08:00',
  pressureUnit: 'hPa',
  showDailyForecast: true,
  showFeelsLike: true,
  showHourlyForecast: true,
  showHumidity: true,
  showPressure: true,
  showUVIndex: true,
  showVisibility: true,
  showWindSpeed: true,
  temperatureUnit: 'celsius',
  timeFormat: '24h',
  visibilityUnit: 'km',
  windSpeedUnit: 'kmh',
};

export const useSettingsStore = create<SettingsActions & SettingsState>()((set) => ({
  resetSettings: () => {
    set({ settings: defaultSettings });
  },
  settings: defaultSettings,
  updateSettings: (updates) => {
    set((state) => ({
      settings: { ...state.settings, ...updates },
    }));
  },
}));
