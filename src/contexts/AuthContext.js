import React, { createContext, useCallback, useReducer } from 'react';
import AuthReducer, { initialState } from '../reducers/AuthReducer';
import { ERROR, LOADING, RESPONSE_SUCCESSFUL, USER_LOGGED } from '../reducers/Actions';
import { auth, database } from '../firebase';
import { collectIdAndData } from '../utils';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const searchUser = useCallback(async (email, roleName) => {
    try {
      const userCollection = await database.collection('accounts').where('email', '==', email).where('role.name', '==', roleName).get();
      
      if (userCollection.empty) {
        throw new Error('No se encontró un usuario con ese correo y ese rol');
      }

      const user = collectIdAndData(userCollection.docs[0]);
      return user;
    } catch (error) {
      return error.message;
    }
  }, []);
  
  const signIn = useCallback(async ({email, password, slugName}, {onError}) => {
    dispatch({type: LOADING});
    try {
      
      await auth.signInWithEmailAndPassword(email, password);
      const response = await searchUser(email, slugName);
      
      if (typeof response === 'string') {
        throw new Error(response);
      }

      localStorage.setItem('user', JSON.stringify(response));
      dispatch({type: USER_LOGGED, payload: response});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, [searchUser]);

  const signOut = useCallback(() => {
    auth.signOut();
    localStorage.clear();
  }, []);

  const sendForgotPasswordEmail = useCallback(async (email, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await auth.sendPasswordResetEmail(email);
      dispatch({type: RESPONSE_SUCCESSFUL});
      onSuccess(`Un correo para cambiar la contraseña fue enviado a ${email}`);
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const getCurrentUser = useCallback(() => {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }

    return null;
  }, []);

  const childProps = { state, signIn, signOut, sendForgotPasswordEmail, getCurrentUser };

  return (
    <AuthContext.Provider value={ childProps }>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;