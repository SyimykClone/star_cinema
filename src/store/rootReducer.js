import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer
});

export default rootReducer;