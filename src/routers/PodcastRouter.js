import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PodcastDetailPage from '../pages/PodcastDetailPage';
import PodcastsPage from '../pages/Podcasts';

const PodcastRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={PodcastsPage} />
      <Route path={`${path}/:id`} component={PodcastDetailPage} />
    </Switch>
  );
}

export default PodcastDetailPage;