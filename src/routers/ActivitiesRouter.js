import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router';
import { Route } from 'react-router';
import ActivitiesPage from '../pages/ActivitiesPage';
import ActivityDetailsPage from '../pages/ActitivityDetailsPage';

const ActivitiesRouter = () => {
  const { path } = useRouteMatch('/platform/activities');

  return (
    <Fragment>
      <Route path={path} exact component={ActivitiesPage} />
      <Route path={`${path}/:id`} component={ActivityDetailsPage} />
    </Fragment>
  );
}

export default ActivitiesRouter;