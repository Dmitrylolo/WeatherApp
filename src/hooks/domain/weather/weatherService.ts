import type { OneCallResponse } from './types';

import i18next from 'i18next';

import { instance } from '@/services/instance';

import { oneCallResponseSchema } from './schema';

// Map i18n language codes to OpenWeatherMap language codes
const getWeatherLang = () => {
  const currentLang = i18next.language;
  switch (currentLang) {
    case 'de-DE': {
      return 'de';
    }
    case 'fr-FR': {
      return 'fr';
    }
    default: {
      return 'en';
    }
  }
};

const createWeatherApi = () => {
  return instance.extend({
    prefixUrl: process.env.WEATHER_API_URL ?? '',
    searchParams: {
      appid: process.env.WEATHER_API_KEY ?? '',
      lang: getWeatherLang(),
      units: 'metric',
    },
  });
};

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<OneCallResponse> {
    return this.getWeatherByCoordinates(lat, lon, ['hourly', 'daily']);
  },

  async getDailyForecast(lat: number, lon: number): Promise<OneCallResponse> {
    return this.getWeatherByCoordinates(lat, lon, ['hourly']);
  },

  async getHourlyForecast(lat: number, lon: number): Promise<OneCallResponse> {
    return this.getWeatherByCoordinates(lat, lon, ['daily']);
  },

  // Get weather data with optional exclusions to reduce response size
  async getWeatherByCoordinates(
    lat: number,
    lon: number,
    exclude?: string[],
  ): Promise<OneCallResponse> {
    const weatherApi = createWeatherApi();
    const searchParameters: Record<string, string> = {
      lat: lat.toString(),
      lon: lon.toString(),
    };

    if (exclude && exclude.length > 0) {
      searchParameters.exclude = exclude.join(',');
    }

    const response = await weatherApi.get('onecall', { searchParams: searchParameters }).json();
    return oneCallResponseSchema.parse(response) as OneCallResponse;
  },
};
