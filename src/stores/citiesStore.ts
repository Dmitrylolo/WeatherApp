import { create } from 'zustand';

type FavoriteCitiesActions = {
  addFavoriteCity: (city: FavoriteCity) => void;
  clearFavoriteCities: () => void;
  removeFavoriteCity: (cityId: string) => void;
  setSelectedCity: (cityId: string | undefined) => void;
  updateFavoriteCity: (cityId: string, updates: Partial<FavoriteCity>) => void;
};

type FavoriteCitiesState = {
  favoriteCities: FavoriteCity[];
  selectedCityId: string | undefined;
};

type FavoriteCity = {
  country: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  state?: string;
};

// Store for managing user's favorite cities
// Does not include current location - that's in useUserLocationStore
export const useFavoriteCitiesStore = create<FavoriteCitiesActions & FavoriteCitiesState>()((set, get) => ({
  addFavoriteCity: (city) => {
    const { favoriteCities } = get();
    if (!favoriteCities.some(c => c.id === city.id)) {
      set({ favoriteCities: [...favoriteCities, city] });
    }
  },
  clearFavoriteCities: () => {
    set({ favoriteCities: [], selectedCityId: undefined });
  },
  favoriteCities: [],
  removeFavoriteCity: (cityId) => {
    const { favoriteCities, selectedCityId } = get();
    const updatedCities = favoriteCities.filter(c => c.id !== cityId);
    set({
      favoriteCities: updatedCities,
      selectedCityId: selectedCityId === cityId ? undefined : selectedCityId,
    });
  },
  selectedCityId: undefined,
  setSelectedCity: (cityId) => {
    set({ selectedCityId: cityId });
  },
  updateFavoriteCity: (cityId, updates) => {
    const { favoriteCities } = get();
    const updatedCities = favoriteCities.map(city =>
      city.id === cityId ? { ...city, ...updates } : city
    );
    set({ favoriteCities: updatedCities });
  },
}));