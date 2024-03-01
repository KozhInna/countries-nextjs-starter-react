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
    removeFavorite(state, action) {
      const updatedFavorites = state.favorites.filter(
        (country) => country.name.common !== action.payload.name.common
      );
      state.favorites = updatedFavorites;
    },
  },
});

export const { addFavorite, clearFavorites, removeFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
