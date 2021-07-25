export const initialState = {
  loading: false,
  books: null,
  bookSelected: null,
  error: null,
};

const BookReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true},
    FETCH_COLLECTION: {...state, books: action.payload, loading: false},
    FETCH_DOCUMENT: {...state, bookSelected: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    RESPONSE_SUCCESSFUL: {...state, loading: false},
  };

  return states[action.type] || state;
}

export default BookReducer;