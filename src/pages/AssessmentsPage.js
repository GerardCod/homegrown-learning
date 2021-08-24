import React, { Fragment, useContext, useEffect } from 'react';
import Empty from '../components/Empty';
import Loader from '../components/Loader';
import { AssessmentContext } from '../contexts/AssessmentContext';
import { onError } from '../utils';
import AssessmentItem from '../components/AssessmentItem';

const AssessmentPage = function Component() {
  const {state, collectionRef, fetchCollection} = useContext(AssessmentContext);
  
  useEffect(() => {
    fetchCollection({ onError });
    const subscriber = collectionRef.current;

    return () => {
      subscriber();
    }
  }, [collectionRef, fetchCollection]);

  return (
    <Fragment>
      <h2 className="Page__Title">Evaluaciones subidas a la plataforma.</h2>
      <div className="flex flex--column items--center">
        {
          state.loading ?
          <Loader /> :
          (state.assessments && state.assessments.length > 0) ?
          state.assessments.map(a => <AssessmentItem assessment={a} key={`assessment-id: ${a.id}`} />) :
          <Empty message="No hay evaluaciones en la plataforma" />
        }
      </div>
    </Fragment>
  );
}

export default AssessmentPage;