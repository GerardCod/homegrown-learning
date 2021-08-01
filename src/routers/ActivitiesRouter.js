import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router';
import { Route } from 'react-router';
import ActivitiesPage from '../pages/ActivitiesPage';

const ActivitiesRouter = () => {
  const { path } = useRouteMatch('/platform/activities');

  return (
    <Fragment>
      <Route path={path} component={ActivitiesPage} />
    </Fragment>
  );
}

export default ActivitiesRouter;