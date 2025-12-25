import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import moviesReducer from './moviesReducer'; 
import favoritesReducer from './favoritesReducer';
import authReducer from './authReducer';
import authMiddleware from './authMiddleware';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  auth: authReducer,
  movies: moviesReducer,
  booking: bookingReducer
});

const favoritesMiddleware = store => next => action => {
  const result = next(action);
  
  if (action.type === 'ADD_TO_FAVORITES' || action.type === 'REMOVE_FROM_FAVORITES') {
    const favorites = store.getState().favorites.favorites;
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }
  
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(authMiddleware, favoritesMiddleware, thunk)
  )
);

export default store;