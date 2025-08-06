// Weather API Types - Global declarations
export type CurrentWeather = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherCondition[];
  wind_deg: number;
  wind_speed: number;
};

export type DailyWeather = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number;
  weather: WeatherCondition[];
  wind_deg: number;
  wind_speed: number;
};

export type HourlyWeather = {
  pop: number; // Probability of precipitation
} & Omit<CurrentWeather, 'sunrise' | 'sunset'>;

export type OneCallResponse = {
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: HourlyWeather[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
};

export type WeatherCondition = {
  description: string;
  icon: string;
  id: number;
  main: string;
};
