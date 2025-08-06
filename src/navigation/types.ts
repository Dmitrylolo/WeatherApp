import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type CityData = {
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  id: string;
  name: string;
  state?: string;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.CityList]: undefined;
  [Paths.Example]: undefined;
  [Paths.Search]: {
    onCitySelected?: (city: CityData) => void;
  };
  [Paths.Startup]: undefined;
  [Paths.Weather]: {
    cityId?: string;
  };
  [Paths.WeatherDetail]: {
    city: CityData;
  };
};
