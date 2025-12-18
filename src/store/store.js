import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';

const favoritesMiddleware = store => next => action => {
  const result = next(action);
  
  if (action.type === 'ADD_TO_FAVORITES' || action.type === 'REMOVE_FROM_FAVORITES') {
    localStorage.setItem('movieFavorites', JSON.stringify(store.getState().favorites.favorites));
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;