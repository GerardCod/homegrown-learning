import React, { Fragment, useCallback, useReducer } from 'react';
import SubmitAssessmentReducer, { initialState, NEXT_QUESTION } from '../reducers/SubmitAssessmentReducer';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

function Question({ questions, handleClose }) {
  const newInitialState = { ...initialState, questions }
  const [state, dispatch] = useReducer(SubmitAssessmentReducer, newInitialState);

  const nextQuestion = useCallback(() => {
    dispatch({ type: NEXT_QUESTION });
  }, []);

  return (
    <Fragment>
      <article className="Question flex flex--column">
        <h3>{state.questions[state.currentQuestionIndex].question}</h3>
        <h5>Respuestas</h5>
        <RadioGroup>
          {
            state.questions[state.currentQuestionIndex].answers.map(a => {
              return (
                <FormControlLabel value={a.answer} control={<Radio />} key={`answer-id: ${a.id}`} label={a.answer} />
              );
            })
          }
        </RadioGroup>
        <div>
          <button onClick={handleClose}>Cancelar</button>
          {
            (state.currentQuestionIndex < state.questions.length - 1) &&
            <button onClick={nextQuestion}>Siguiente</button>
          }
        </div>
      </article>
    </Fragment>
  );
}

export default Question;