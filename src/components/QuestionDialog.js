import React, { useContext, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  DialogContentText,
  IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Send } from '@material-ui/icons';
import { generateSubmit, onError } from '../utils';
import { AuthContext } from '../contexts/AuthContext';
import { SubmitAssessmentContext } from '../contexts/SubmitAssessmentContext';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { Redirect } from 'react-router-dom';

function QuestionDialog({ assessment, open, handleClose }) {
  const { state, answerQuestion, nextQuestion, previousQuestion, submitAssessment } = useContext(SubmitAssessmentContext);
  const { getCurrentUser } = useContext(AuthContext);
  const { addAssessmentSubmit } = useContext(AssessmentContext);
  const [redirect, setRedirect] = useState(false);

  // eslint-disable-next-line
  const handleSubmit = () => {
    const newSubmit = generateSubmit(state, getCurrentUser());
    addAssessmentSubmit(assessment, newSubmit, { onError });
    handleClose();
    setRedirect(true);
  };

  useEffect(() => {
    if (state.score) {
      handleSubmit();
    }
  }, [state, handleSubmit]);

  return (
    <Dialog open={open}>
      <DialogTitle>{assessment.title}</DialogTitle>
      <DialogContent dividers>
        <h2>{state.questions[state.currentQuestionIndex].question}</h2>
        {
          redirect && <Redirect to={`/platform/assessments/${assessment.id}/results`} />
        }
        <DialogContentText>
          <FormControl component="fieldset">
            <FormLabel>Respuestas</FormLabel>
            <RadioGroup>
              {
                state.questions[state.currentQuestionIndex].answers.map(a => {
                  return <FormControlLabel value={a.answer}
                    control={
                      <Radio
                        onChange={() => { answerQuestion(a, state.questions[state.currentQuestionIndex].id); }}
                        checked={state.questions[state.currentQuestionIndex].answerSelected && state.questions[state.currentQuestionIndex].answerSelected.answer === a.answer}
                      />
                    }
                    label={a.answer} key={`answer-id: ${a.id}`} />
                })
              }
            </RadioGroup>
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>Cerrar</Button>
        {
          (state.currentQuestionIndex > 0) &&
          <IconButton onClick={previousQuestion} color="primary" variant="contained">
            <ChevronLeft />
          </IconButton>
        }
        {
          (state.currentQuestionIndex < state.questions.length - 1) &&
          <IconButton onClick={nextQuestion} color="primary" variant="contained">
            <ChevronRight />
          </IconButton>
        }
        {
          (state.currentQuestionIndex === (state.questions.length - 1)) &&
          <Button endIcon={<Send />} variant="contained" color="primary" onClick={submitAssessment}>
            Enviar
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
}

QuestionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default QuestionDialog;