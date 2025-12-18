import { createAction } from '@reduxjs/toolkit';

export const addToFavorites = createAction('ADD_TO_FAVORITES', (movie) => ({
  payload: movie
}));

export const removeFromFavorites = createAction('REMOVE_FROM_FAVORITES', (movieId) => ({
  payload: movieId
}));