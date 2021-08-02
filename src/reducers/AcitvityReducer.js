export const initialState = {
  loading: false,
  activities: null,
  error: null,
  activitySelected: null
}

const ActivityReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true},
    FETCH_COLLECTION: {...state, activities: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    RESPONSE_SUCCESSFUL: {...state, loading: false},
    FETCH_DOCUMENT: {...state, activitySelected: action.payload, loading: false}
  }

  return states[action.type] || state;
}

export default ActivityReducer;