import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Currency } from "@/types";

export interface EstateState {
  favorites: string[];
  compareList: string[];
  currency: Currency;
  searchQuery: string;
  selectedTypology: string;
  selectedSubmarket: string;
  priceRange: [number, number];
}

export interface EstateActions {
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  setCurrency: (currency: Currency) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTypology: (typology: string) => void;
  setSelectedSubmarket: (submarket: string) => void;
  setPriceRange: (range: [number, number]) => void;
}

export type EstateStore = EstateState & EstateActions;

export const useEstateStore = create<EstateStore>()(
  subscribeWithSelector((set, get) => ({
    favorites: ["prop-1", "prop-3", "prop-5"],
    compareList: ["prop-1", "prop-2"],
    currency: "USD",
    searchQuery: "",
    selectedTypology: "All Typologies",
    selectedSubmarket: "All Markets",
    priceRange: [5000000, 100000000],

    toggleFavorite: (id: string) => {
      const favorites = get().favorites;
      if (favorites.includes(id)) {
        set({ favorites: favorites.filter((item) => item !== id) });
      } else {
        set({ favorites: [...favorites, id] });
      }
    },

    isFavorite: (id: string) => {
      return get().favorites.includes(id);
    },

    addToCompare: (id: string) => {
      const compareList = get().compareList;
      if (compareList.includes(id)) return false;
      if (compareList.length >= 4) return false;
      set({ compareList: [...compareList, id] });
      return true;
    },

    removeFromCompare: (id: string) => {
      set({ compareList: get().compareList.filter((item) => item !== id) });
    },

    clearCompare: () => {
      set({ compareList: [] });
    },

    setCurrency: (currency: Currency) => {
      set({ currency });
    },

    setSearchQuery: (searchQuery: string) => {
      set({ searchQuery });
    },

    setSelectedTypology: (selectedTypology: string) => {
      set({ selectedTypology });
    },

    setSelectedSubmarket: (selectedSubmarket: string) => {
      set({ selectedSubmarket });
    },

    setPriceRange: (priceRange: [number, number]) => {
      set({ priceRange });
    },
  }))
);
