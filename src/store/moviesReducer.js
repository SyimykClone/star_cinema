import moviesData from '../data/movies.json';

const initialState = {
  movies: moviesData.movies,
  loading: false
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default moviesReducer;