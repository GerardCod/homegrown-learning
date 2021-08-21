
export const initialState = {
  loading: false,
  assessments: null,
  error: null,
  assessmentSelected: null,
}

const AssessmentReducer = function reducer(state, action) {
  const states = {
    LOADING: {...state, loading: true},
    FETCH_COLLECTION: {...state, assessments: action.payload, loading: false},
    FETCH_DOCUMENT: {...state, assessmentSelected: action.payload, loading: false},
    ERROR: {...state, error: action.payload, loading: false},
    RESPONSE_SUCCESSFUL: {...state, loading: false},
  }

  return states[action.type] || state;
}

export default AssessmentReducer;
