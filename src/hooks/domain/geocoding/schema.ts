import { z } from 'zod';

export const geoLocationSchema = z.object({
  country: z.string(),
  lat: z.number(),
  local_names: z.record(z.string(), z.string()).optional(),
  lon: z.number(),
  name: z.string(),
  state: z.string().optional(),
});

export const reverseGeoLocationSchema = z.object({
  country: z.string(),
  lat: z.number(),
  local_names: z.record(z.string(), z.string()).optional(),
  lon: z.number(),
  name: z.string(),
  state: z.string().optional(),
});
