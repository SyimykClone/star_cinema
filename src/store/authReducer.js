import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_AUTH_ERROR
} from './authActions';

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('movieUser');
    const token = localStorage.getItem('movieToken');
    return user && token ? { user: JSON.parse(user), token } : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage()?.user || null,
  token: loadUserFromStorage()?.token || null,
  loading: false,
  error: null,
  isAuthenticated: !!loadUserFromStorage()
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null
      };
      
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
        isAuthenticated: false
      };
      
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null
      };
      
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null
      };
      
    default:
      return state;
  }
};

export default authReducer;