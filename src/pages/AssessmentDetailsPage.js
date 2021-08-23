import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { onError } from '../utils';
import Loader from '../components/Loader';
import AssessmentLink from '../components/AssessmentLink';
import { Button, createTheme, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { Assessment } from '@material-ui/icons';
import QuestionDialog from '../components/QuestionDialog';
import SubmitAssessmentProvider from '../contexts/SubmitAssessmentContext';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const styles = makeStyles({
  root: {
    color: '#ffffff',
  }
});

const AssessmentDetailsPage = function Component() {
  const { id } = useParams();
  const { state, documentRef, fetchAssessment } = useContext(AssessmentContext);
  const classes = styles();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchAssessment(id, { onError });
    const subscription = documentRef.current;

    return () => {
      subscription();
    }
  }, [id, documentRef, fetchAssessment]);

  const handleClick = function click() {
    setOpenDialog(true);
  }

  const handleClose = function close() {
    setOpenDialog(false);
  }

  return (
    <Fragment>
      <Back backUrl="/platform/assessments" />
      {
        state.assessmentSelected ?
          <div>
            <h1 className="Page__Title">{state.assessmentSelected.title}</h1>
            <p>{state.assessmentSelected.instructions}</p>
            {
              state.assessmentSelected.type === 'enlace' ?
                <AssessmentLink {...state.assessmentSelected} /> :
                <div>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.root}
                      startIcon={<Assessment />}
                      onClick={handleClick}
                    >Comenzar quiz</Button>
                  </ThemeProvider>
                  <SubmitAssessmentProvider assessmentState={state.assessmentSelected}>
                    <QuestionDialog assessment={state.assessmentSelected} open={openDialog} handleClose={handleClose} />
                  </SubmitAssessmentProvider>
                </div>
            }
          </div> :
          <Loader />
      }
    </Fragment>
  );
}

export default AssessmentDetailsPage;