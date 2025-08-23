import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: string[]; // array of car IDs
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => { //save Ids of clicked Cars(`Favorite btn`) to LocalStorage
        const id = action.payload;
        if( state.favorites.includes(id) ){ state.favorites = state.favorites.filter((favId) => favId !== id); } 
        else{ state.favorites.push(id); }
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => { //remove Ids of clicked Cars(`Clear Favorites btn`) from LocalStorage
        state.favorites = [];
        localStorage.setItem("favorites", JSON.stringify([]));
    },
  },
});
export const { toggleFavorite,clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
