import { z } from 'zod';

export const weatherConditionSchema = z.object({
  description: z.string(),
  icon: z.string(),
  id: z.number(),
  main: z.string(),
});

export const currentWeatherSchema = z.object({
  clouds: z.number(),
  dew_point: z.number(),
  dt: z.number(),
  feels_like: z.number(),
  humidity: z.number(),
  pressure: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  temp: z.number(),
  uvi: z.number(),
  visibility: z.number(),
  weather: z.array(weatherConditionSchema),
  wind_deg: z.number(),
  wind_speed: z.number(),
});

export const dailyWeatherSchema = z.object({
  clouds: z.number(),
  dew_point: z.number(),
  dt: z.number(),
  feels_like: z.object({
    day: z.number(),
    eve: z.number(),
    morn: z.number(),
    night: z.number(),
  }),
  humidity: z.number(),
  moon_phase: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  pop: z.number(),
  pressure: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  temp: z.object({
    day: z.number(),
    eve: z.number(),
    max: z.number(),
    min: z.number(),
    morn: z.number(),
    night: z.number(),
  }),
  uvi: z.number(),
  weather: z.array(weatherConditionSchema),
  wind_deg: z.number(),
  wind_speed: z.number(),
});

export const hourlyWeatherSchema = currentWeatherSchema
  .omit({ sunrise: true, sunset: true })
  .extend({
    pop: z.number(),
  });

export const oneCallResponseSchema = z.object({
  current: currentWeatherSchema,
  daily: z.array(dailyWeatherSchema),
  hourly: z.array(hourlyWeatherSchema),
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
});
