import { configureStore } from "@reduxjs/toolkit";
import courtriesReducer from "./countriesSlice";
import favoritesReducer from "./favoritesSlice";

export default configureStore({
  reducer: {
    countries: courtriesReducer,
    favorites: favoritesReducer,
  },
});
