import React from 'react';
import { Route, useRouteMatch } from 'react-router';
import { Switch } from 'react-router-dom';
import PodcastDetailPage from '../pages/PodcastDetailPage';
import PodcastsPage from '../pages/Podcasts';

const PodcastRouter = () => {
  const { path } = useRouteMatch('/platform/podcasts');

  return (
    <Switch>
      <Route path={path} exact component={PodcastsPage} />
      <Route path={`${path}/:id`} component={PodcastDetailPage} />
    </Switch>
  );
}

export default PodcastRouter;