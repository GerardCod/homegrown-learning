import React, { createContext, useCallback, useReducer } from 'react';
import AuthReducer, { initialState } from '../reducers/AuthReducer';
import { ERROR, LOADING, USER_LOGGED } from '../reducers/Actions';
import { auth, database } from '../firebase';
import { collectIdAndData } from '../utils';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signIn = useCallback(async ({email, password, slugName}, {onError}) => {
    dispatch({type: LOADING});
    try {
      const user = await searchUser(email, slugName);
      if (user) {
        await auth.signInWithEmailAndPassword(email, password);
      }
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({type: USER_LOGGED, payload: user});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const searchUser = useCallback(async (email, roleName) => {
    try {
      const userCollection = await database.collection('accounts').where('email', '==', email).where('role.slugName', '==', roleName).get();
      const user = collectIdAndData(userCollection.docs[0]);
      return user;
    } catch (error) {
      return error;
    }
  }, []);

  const childProps = { state, signIn };

  return (
    <AuthContext.Provider value={ childProps }>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;