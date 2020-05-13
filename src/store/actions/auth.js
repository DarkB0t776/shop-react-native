import { AUTHENTICATE, SET_DID_TRY_AL, LOGOUT } from '../types/index';
import AsyncStorage from '@react-native-community/async-storage';

const API_KEY = 'AIzaSyBcG8mjNUo3Xr-mLj5LmwN0E-4jyWyuRlU';
let timer;

export const setDidTryAL = () => {
  return {
    type: SET_DID_TRY_AL
  }
};

export const authenticate = (userId, token, expireTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expireTime))
    dispatch({
      type: AUTHENTICATE,
      userId,
      token
    });
  }
}

export const signup = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = 'Something went wrong!';

        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already';
        }
        throw new Error(message);
      }

      const data = await response.json();

      dispatch(authenticate.data.localId, data.idToken, parseInt(data.expiresIn) * 1000);
      const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (e) {
      throw e;
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = 'Something went wrong!';

        if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
          message = 'Your email or password is incorrect';
        }
        throw new Error(message);
      }

      const data = await response.json();

      dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
      const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (e) {
      throw e;
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT
  }
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expireDate: expirationDate.toISOString()
  }));
};