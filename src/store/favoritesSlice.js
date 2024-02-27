import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite(state, action) {
      // searching for duplicates with "some" method
      if (
        state.favorites.some(
          (country) => country.name.common === action.payload.name.common
        )
      ) {
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
