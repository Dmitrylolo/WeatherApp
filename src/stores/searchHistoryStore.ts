import { create } from 'zustand';

type SearchHistoryActions = {
  addSearchTerm: (term: string) => void;
  clearHistory: () => void;
  removeSearchTerm: (term: string) => void;
};

type SearchHistoryState = {
  searchHistory: string[];
};

const MAX_HISTORY_ITEMS = 20;

export const useSearchHistoryStore = create<SearchHistoryActions & SearchHistoryState>()((set, get) => ({
  addSearchTerm: (term) => {
    const { searchHistory } = get();
    const trimmedTerm = term.trim();
    if (trimmedTerm && !searchHistory.includes(trimmedTerm)) {
      const updatedHistory = [trimmedTerm, ...searchHistory.slice(0, MAX_HISTORY_ITEMS - 1)];
      set({ searchHistory: updatedHistory });
    }
  },
  clearHistory: () => {
    set({ searchHistory: [] });
  },
  removeSearchTerm: (term) => {
    const { searchHistory } = get();
    set({ searchHistory: searchHistory.filter(item => item !== term) });
  },
  searchHistory: [],
}));
