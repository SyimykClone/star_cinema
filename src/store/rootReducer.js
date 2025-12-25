import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer
  ,booking: bookingReducer
});

export default rootReducer;