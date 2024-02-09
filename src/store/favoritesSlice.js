import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite(state, action) {
      const check = state.favorites.filter((country) =>
        country.name.common.includes(action.payload.name.common)
      );
      if (check.length > 0) {
        return;
      }

      state.favorites = [...state.favorites, action.payload];
      console.log(state.favorites);
    },
    clearFavorites(state, action) {
      state.favorites = [];
    },
  },
});

export const { addFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
