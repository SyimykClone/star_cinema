import { createReducer } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites } from './actions';

const loadFavoritesFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('movieFavorites');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading favorites from localStorage:', err);
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage()
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToFavorites, (state, action) => {
      if (!state.favorites.some(fav => fav.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    })
    .addCase(removeFromFavorites, (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    });
});

export default favoritesReducer;