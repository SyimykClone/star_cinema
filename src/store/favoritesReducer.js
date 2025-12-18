import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './actions';

const loadFavoritesForUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('movieUser') || 'null');
    if (user && user.favorites) {
      return user.favorites;
    }
    
    const favorites = localStorage.getItem('movieFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesForUser()
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (!state.favorites.some(fav => fav.id === action.payload.id)) {
        const newFavorites = [...state.favorites, action.payload];
        
        const user = JSON.parse(localStorage.getItem('movieUser') || 'null');
        if (user) {
          user.favorites = newFavorites;
          localStorage.setItem('movieUser', JSON.stringify(user));
          
          localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
        }
        
        return { ...state, favorites: newFavorites };
      }
      return state;
      
    case REMOVE_FROM_FAVORITES:
      const newFavorites = state.favorites.filter(fav => fav.id !== action.payload);
      
      const user = JSON.parse(localStorage.getItem('movieUser') || 'null');
      if (user) {
        user.favorites = newFavorites;
        localStorage.setItem('movieUser', JSON.stringify(user));
        
        localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      }
      
      return { ...state, favorites: newFavorites };
      
    default:
      return state;
  }
};

export default favoritesReducer;