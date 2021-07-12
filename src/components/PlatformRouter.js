import React, { Suspense } from 'react';
import Layout from './Layout';
import { Route } from 'react-router';
import Loader from './Loader';

//Providers
const PodcastsProvider = React.lazy(() => import('../contexts/PodcastsContext'));

//Routers
const PodcastRouter = React.lazy(() => import('../routers/PodcastRouter'));

const PlatformRouter = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <PodcastsProvider>
          <Route path="/platform/podcasts" exact component={PodcastRouter} />
        </PodcastsProvider>
      </Suspense>
    </Layout>
  );
}

export default PlatformRouter;