// Geocoding API Types
export type Coordinates = {
  lat: number;
  lon: number;
};

export type GeoLocation = {
  country: string;
  lat: number;
  local_names?: Record<string, string>;
  lon: number;
  name: string;
  state?: string;
};

export type ReverseGeoLocation = {
  country: string;
  lat: number;
  local_names?: Record<string, string>;
  lon: number;
  name: string;
  state?: string;
};
