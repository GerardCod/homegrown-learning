import React, { createContext, useCallback, useReducer } from 'react';
import AuthReducer, { initialState } from '../reducers/AuthReducer';
import { ERROR, LOADING, RESPONSE_SUCCESSFUL, USER_LOGGED } from '../reducers/Actions';
import { auth, database } from '../firebase';
import { collectIdAndData, roles } from '../utils';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const searchUser = useCallback(async (email, roleName) => {
    try {
      const userCollection = await database.collection('accounts').where('email', '==', email).where('role.slugName', '==', roles[roleName]).get();
      const user = collectIdAndData(userCollection.docs[0]);
      return user;
    } catch (error) {
      return error;
    }
  }, []);
  
  const signIn = useCallback(async ({email, password, slugName}, {onError}) => {
    dispatch({type: LOADING});
    try {
      const user = await searchUser(email, slugName);
      if (user) {
        await auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: USER_LOGGED, payload: user});
      }
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

  const childProps = { state, signIn, signOut, sendForgotPasswordEmail };

  return (
    <AuthContext.Provider value={ childProps }>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;