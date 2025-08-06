import type { GeoLocation, ReverseGeoLocation } from './types';

import { z } from 'zod';

import { instance } from '@/services/instance';

import { geoLocationSchema, reverseGeoLocationSchema } from './schema';

const geocodingApi = instance.extend({
  prefixUrl: process.env.GEOCODING_API_URL ?? '',
  searchParams: {
    appid: process.env.WEATHER_API_KEY ?? '',
  },
});

export const geocodingService = {
  async getLocationByCoordinates(
    lat: number,
    lon: number,
    limit = 1,
  ): Promise<ReverseGeoLocation[]> {
    const searchParameters = {
      lat: lat.toString(),
      limit: limit.toString(),
      lon: lon.toString(),
    };

    const response = await geocodingApi
      .get('reverse', { searchParams: searchParameters })
      .json();

    return z.array(reverseGeoLocationSchema).parse(response) as ReverseGeoLocation[];
  },

  async getPrimaryLocationName(lat: number, lon: number): Promise<string> {
    const locations = await this.getLocationByCoordinates(lat, lon, 1);
    return locations[0]?.name ?? 'Unknown Location';
  },

  async searchCities(query: string, limit = 5): Promise<GeoLocation[]> {
    if (!query.trim()) {
      return [];
    }

    const searchParameters = {
      limit: limit.toString(),
      q: query.trim(),
    };

    const response = await geocodingApi
      .get('direct', { searchParams: searchParameters })
      .json();

    return z.array(geoLocationSchema).parse(response) as GeoLocation[];
  },
};
