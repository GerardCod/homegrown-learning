import React, { Suspense } from 'react';
import Layout from './Layout';
import { Route } from 'react-router';
import Loader from './Loader';
import { Switch } from 'react-router-dom';
import VideosPage from '../pages/VideosPage';

//Providers
const PodcastsProvider = React.lazy(() => import('../contexts/PodcastsContext'));
const VideosProvider = React.lazy(() => import('../contexts/VideoContext'));

//Routers
const PodcastRouter = React.lazy(() => import('../routers/PodcastRouter'));

const PlatformRouter = () => {
  return (
    <Layout>
      <Switch>
        <Suspense fallback={<Loader />}>
          <PodcastsProvider>
            <Route path="/platform/podcasts" exact component={PodcastRouter} />
          </PodcastsProvider>
          <VideosProvider>
            <Route path="/platform/videos" component={VideosPage} />
          </VideosProvider>
        </Suspense>
      </Switch>
    </Layout>
  );
}

export default PlatformRouter;