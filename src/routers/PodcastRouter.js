import React, { Fragment } from 'react';
import { Route, useRouteMatch } from 'react-router';
import PodcastDetailPage from '../pages/PodcastDetailPage';
import PodcastsPage from '../pages/Podcasts';

const PodcastRouter = () => {
  const { path } = useRouteMatch('/platform/podcasts');

  return (
    <Fragment>
      <Route path={path} exact component={PodcastsPage} />
      <Route path={`${path}/:id`} component={PodcastDetailPage} />
    </Fragment>
  );
}

export default PodcastRouter;