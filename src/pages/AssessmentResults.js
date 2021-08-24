import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import Loader from '../components/Loader';
import QuestionItem from '../components/QuestionItem';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { AuthContext } from '../contexts/AuthContext';
import { onError } from '../utils';

const AssessmentResults = function Component() {
  const { state, fetchAssessment, documentRef} = useContext(AssessmentContext);
  const { id } = useParams();
  const [submit, setSubmit] = useState({});
  const { getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAssessment(id, { onError });
    const subscription = documentRef.current;

    return () => {
      subscription();
    }
  }, [fetchAssessment, id, documentRef]);

  useEffect(() => {
    if (state.assessmentSelected) {
      const submit = state.assessmentSelected.submits.filter(s => s.user.email === getCurrentUser().email)[0];
      setSubmit({...submit});
    }
  }, [state, getCurrentUser]);

  return (
    <Fragment>
      <Back backUrl={`/platform/assessments/${id}`} />
      {
        state.assessmentSelected && submit.submit ? 
        <div>
          <h1 className="Page__Title">Resultados de la prueba</h1>
          <section className="Results__Score flex content--center items--center">
            <span className="Results__ScoreNumber">{submit.submit.score} / 10</span>
          </section>
          <br />
          {
            submit.submit.questions.map(q => <QuestionItem question={q} key={`question-id: ${q.id}`} />)
          }
        </div> :
        <Loader />
      }
    </Fragment>
  );
}

export default AssessmentResults;