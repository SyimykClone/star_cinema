import { createAction } from '@reduxjs/toolkit';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = createAction('ADD_TO_FAVORITES', (movie) => ({
  payload: movie
}));

export const removeFromFavorites = createAction('REMOVE_FROM_FAVORITES', (movieId) => ({
  payload: movieId
}));