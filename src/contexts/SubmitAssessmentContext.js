import React, { createContext, useCallback, useReducer } from 'react';
import SubmitAssessmentReducer, { ANSWER_QUESTION, initialState, NEXT_QUESTION, PREVIOUS_QUESTION, SUBMIT_ASSESSMENT } from '../reducers/SubmitAssessmentReducer';
import PropTypes from 'prop-types';

export const SubmitAssessmentContext = createContext();

const SubmitAssessmentProvider = function Component({children, assessmentState: {questions}}) {
  const [state, dispatch] = useReducer(SubmitAssessmentReducer, {...initialState, questions});

  const answerQuestion = useCallback(function callback(answer, id) {
    const answerSelected = {id, answer};
    dispatch({type: ANSWER_QUESTION, payload: answerSelected});
  }, [])

  const nextQuestion = useCallback(function nextCallback() {
    dispatch({type: NEXT_QUESTION});
  }, []);

  const previousQuestion = useCallback(() => {
    dispatch({ type: PREVIOUS_QUESTION });
  }, []);

  const submitAssessment = useCallback(() => {
    dispatch({type: SUBMIT_ASSESSMENT});
  }, []);

  const childProps = {
    state,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitAssessment,
  }

  return (
    <SubmitAssessmentContext.Provider value={childProps}>
      { children }
    </SubmitAssessmentContext.Provider>
  );
}

SubmitAssessmentProvider.propTypes = {
  assessmentState: PropTypes.object.isRequired,
}

export default SubmitAssessmentProvider;