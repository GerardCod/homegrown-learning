import React, { Fragment } from 'react';
import { useRouteMatch, Route } from 'react-router';
import AssessmentsPage from '../pages/AssessmentsPage';
import AssessmentDetailsRouter from './AssessmentDetailsRouter';

const AssessmentRouter = function Router() {
  const { path } = useRouteMatch('/platform/assessments');

  return (
    <Fragment>
      <Route path={path} exact component={AssessmentsPage} />
      <Route path={`${path}/:id`} component={AssessmentDetailsRouter} />
    </Fragment>
  );
}

export default AssessmentRouter;