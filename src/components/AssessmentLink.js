import React, { useContext } from 'react';
import { Button, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Send } from '@material-ui/icons';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { generateSubmit, onError } from '../utils';
import { AuthContext } from '../contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: green,
  }
});

const styles = makeStyles({
  root: {
    color: '#ffffff',
  },
});

const AssessmentLink = function Component({ assessment }) {
  const classes = styles();
  const { addAssessmentSubmit } = useContext(AssessmentContext);
  const { getCurrentUser } = useContext(AuthContext);

  const handleSubmit = () => {
    const submit = generateSubmit({ link: assessment.link }, getCurrentUser());
    addAssessmentSubmit(assessment, submit, { onError });
  }

  return (
    <article>
      <h4>Enlace de la evaluación</h4>
      <a href={assessment.link} target="_blank" rel="noreferrer">
        <span>{assessment.link}</span>
      </a>
      <br />
      <br />
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          className={classes.root} startIcon={<Send />}
          onClick={handleSubmit}
        >Entregar actividad</Button>
      </ThemeProvider>
    </article>
  );
}

export default AssessmentLink;