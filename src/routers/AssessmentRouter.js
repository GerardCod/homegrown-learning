import React, { Fragment } from 'react';
import { useRouteMatch, Route } from 'react-router';
import AssessmentDetailsPage from '../pages/AssessmentDetailsPage';
import AssessmentsPage from '../pages/AssessmentsPage';

const AssessmentRouter = function Router() {
  const { path } = useRouteMatch('/platform/assessments');

  return (
    <Fragment>
      <Route path={path} exact component={AssessmentsPage} />
      <Route path={`${path}/:id`} component={AssessmentDetailsPage} />
    </Fragment>
  );
}

export default AssessmentRouter;