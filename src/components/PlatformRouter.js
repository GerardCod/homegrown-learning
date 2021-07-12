import React, { Suspense } from 'react';
import Layout from './Layout';
import { Route } from 'react-router';
import Loader from './Loader';
import { Switch } from 'react-router-dom';

//Providers
const PodcastsProvider = React.lazy(() => import('../contexts/PodcastsContext'));

//Routers
const PodcastRouter = React.lazy(() => import('../routers/PodcastRouter'));

const PlatformRouter = () => {
  return (
    <Layout>
      <Switch>
        <Suspense fallback={<Loader />}>
          <PodcastsProvider>
            <Route path="/platform/podcasts" component={PodcastRouter} />
          </PodcastsProvider>
        </Suspense>
      </Switch>
    </Layout>
  );
}

export default PlatformRouter;