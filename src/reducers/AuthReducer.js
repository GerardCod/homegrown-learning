export const initialState = {
  loading: false,
  account: null,
  error: null
}

const AuthReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true},
    USER_LOGGED: {...state, loading: false, account: action.payload},
    ERROR: {...state, loading: false, error: action.payload}
  }; 

  return states[action.type] || state;
}

export default AuthReducer;