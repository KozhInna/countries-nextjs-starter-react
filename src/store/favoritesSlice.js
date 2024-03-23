import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteToFirebase,
  auth,
  clearFavoritesFromFirebase,
  removeFavoriteFromFirebase,
} from "../auth/firebase";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    getFavorites(state, action) {
      state.favorites = action.payload;
    },
    addFavorite(state, action) {
      if (state.favorites.some((country) => country === action.payload)) {
        return;
      }

      state.favorites = [...state.favorites, action.payload];
      const user = auth.currentUser;
      if (user) addFavoriteToFirebase(user.uid, action.payload);
    },

    clearFavorites(state, action) {
      state.favorites = [];
      const user = auth.currentUser;
      if (user) {
        clearFavoritesFromFirebase(user.uid);
      }
    },
    removeFavorite(state, action) {
      const updatedFavorites = state.favorites.filter(
        (country) => country !== action.payload
      );
      state.favorites = updatedFavorites;
      const user = auth.currentUser;
      if (user) {
        removeFavoriteFromFirebase(user.uid, action.payload);
      }
    },
  },
});

export const { getFavorites, addFavorite, clearFavorites, removeFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
