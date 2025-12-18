import { v4 as uuidv4 } from 'uuid';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './authActions';

const authApi = {
  register: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('movieUsers') || '[]');
        const existingUser = users.find(u => u.email === userData.email);
        
        if (existingUser) {
          reject(new Error('Пользователь с таким email уже существует'));
          return;
        }
        
        const newUser = {
          id: uuidv4(),
          ...userData,
          createdAt: new Date().toISOString(),
          favorites: []
        };
        
        users.push(newUser);
        localStorage.setItem('movieUsers', JSON.stringify(users));
        
        const token = `token_${uuidv4()}`;
        
        resolve({
          user: newUser,
          token
        });
      }, 1000);
    });
  },
  
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('movieUsers') || '[]');
        const user = users.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );
        
        if (!user) {
          reject(new Error('Неверный email или пароль'));
          return;
        }
        
        const token = `token_${uuidv4()}`;
        
        resolve({
          user,
          token
        });
      }, 1000);
    });
  }
};

const authMiddleware = store => next => action => {
  if (action.type === REGISTER_REQUEST) {
    const { email, password, name } = action.payload;
    
    if (!email || !password || !name) {
      store.dispatch({
        type: REGISTER_FAILURE,
        payload: 'Все поля обязательны для заполнения'
      });
      return next(action);
    }
    
    if (password.length < 6) {
      store.dispatch({
        type: REGISTER_FAILURE,
        payload: 'Пароль должен быть не менее 6 символов'
      });
      return next(action);
    }
    
    authApi.register(action.payload)
      .then(response => {
        localStorage.setItem('movieUser', JSON.stringify(response.user));
        localStorage.setItem('movieToken', response.token);
        
        store.dispatch({
          type: REGISTER_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        store.dispatch({
          type: REGISTER_FAILURE,
          payload: error.message
        });
      });
  }
  
  if (action.type === LOGIN_REQUEST) {
    const { email, password } = action.payload;
    
    if (!email || !password) {
      store.dispatch({
        type: LOGIN_FAILURE,
        payload: 'Все поля обязательны для заполнения'
      });
      return next(action);
    }
    
    authApi.login(action.payload)
      .then(response => {
        localStorage.setItem('movieUser', JSON.stringify(response.user));
        localStorage.setItem('movieToken', response.token);
        
        store.dispatch({
          type: LOGIN_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        store.dispatch({
          type: LOGIN_FAILURE,
          payload: error.message
        });
      });
  }
  
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('movieUser');
    localStorage.removeItem('movieToken');
  }
  
  return next(action);
};

export default authMiddleware;