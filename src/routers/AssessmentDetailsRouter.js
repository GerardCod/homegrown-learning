import React, { Fragment } from 'react';
import { Route, useRouteMatch } from 'react-router';
import AssessmentDetailsPage from '../pages/AssessmentDetailsPage';
import AssessmentResults from '../pages/AssessmentResults';

const AssessmentDetailsRouter = function Component() {
  const { path } = useRouteMatch();

  return (
    <Fragment>
      <Route path={path} exact component={AssessmentDetailsPage} />
      <Route path={`${path}/results`} component={AssessmentResults} />
    </Fragment>
  );
}

export default AssessmentDetailsRouter;