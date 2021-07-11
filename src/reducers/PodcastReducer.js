export const initialState = {
  loading: false,
  podcasts: [],
  error: null,
  podcastSelected: null,
}

const PodcastsReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true, error: null},
    FETCH_COLLECTION: {...state, loading: false, podcasts: action.payload},
    ERROR: {...state, loading: false, error: action.payload},
    FETCH_DOCUMENT: {...state, loading: false, podcastSelected: action.payload},
    RESPONSE_SUCCESSFUL: {...state, loading: false}
  };

  return states[action.type] || state;
}

export default PodcastsReducer;