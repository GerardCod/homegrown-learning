import React from 'react';
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
} from '@material-ui/core';
import PropTypes from 'prop-types';

function QuestionDialog({assessment, open, handleClose}) {
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{assessment.title}</DialogTitle>
      <DialogContent dividers>
        <h2>{assessment.questions[0].question}</h2>
        <FormControl component="fieldset">
          <FormLabel>Respuestas</FormLabel>
          <RadioGroup>
            {
              assessment.questions[0].answers.map(a => {
                return <FormControlLabel value={a.answer} control={<Radio />} label={a.answer} key={`answer-id: ${a.id}`} />
              })
            }
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>Cerrar</Button>
        <Button variant="contained" color="primary" onClick={handleClose}>Continuar</Button>
      </DialogActions>
    </Dialog>
  );
}

QuestionDialog.propTypes = {
  assessment: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default QuestionDialog;