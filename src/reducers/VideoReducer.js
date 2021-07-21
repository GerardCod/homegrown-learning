export const initialState = {
  loading: false,
  videos: null,
  error: null,
  videoSelected: null,
}

const VideoReducer = (state, action) => {
  const states = {
    LOADING: {...state, loading: true},
    FETCH_COLLECTION: {...state, loading: false, videos: action.payload},
    FETCH_DOCUmENT: {...state, loading: false, videoSelected: action.payload},
    ERROR: {...state, loading: false, error: action.payload},
    RESPONSE_SUCCESSFUL: {...state, loading: false},
  }

  return states[action.type] || state;
}

export default VideoReducer;