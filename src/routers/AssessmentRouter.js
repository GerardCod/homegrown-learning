import React, { Fragment } from 'react';
import { useRouteMatch, Route } from 'react-router';
import AssessmentsPage from '../pages/AssessmentsPage';

const AssessmentRouter = function Router() {
  const { path } = useRouteMatch('/platform/assessments');

  return (
    <Fragment>
      <Route path={path} component={AssessmentsPage} />
    </Fragment>
  );
}

export default AssessmentRouter;