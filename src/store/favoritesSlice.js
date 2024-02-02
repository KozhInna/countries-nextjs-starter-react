import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite(state, action) {
      state.favorites = [...state.favorites, action.payload];
    },
    clearFavorites(state, action) {
      state.favorites = [];
    },
  },
});

export const { addFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
