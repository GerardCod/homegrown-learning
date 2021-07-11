import React, { Suspense } from 'react';
import Layout from './Layout';
import PodcastsPage from '../pages/Podcasts';
import { Route } from 'react-router';

const PodcastsProvider = React.lazy(() => import('../contexts/PodcastsContext'));

const PlatformRouter = () => {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <PodcastsProvider>
          <Route path="/platform/podcasts" exact component={PodcastsPage} />
        </PodcastsProvider>
      </Suspense>
    </Layout>
  );
}

export default PlatformRouter;