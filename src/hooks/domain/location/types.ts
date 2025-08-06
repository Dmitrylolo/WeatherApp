// Location related types
export type GeolocationPosition = {
  coords: {
    accuracy: number;
    altitude: null | number;
    altitudeAccuracy: null | number;
    heading: null | number;
    latitude: number;
    longitude: number;
    speed: null | number;
  };
  timestamp: number;
};

export type Position = {
  lat: number;
  lon: number;
};
