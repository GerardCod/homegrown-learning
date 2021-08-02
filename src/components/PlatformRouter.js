import React, { Suspense } from 'react';
import Layout from './Layout';
import { Route } from 'react-router';
import Loader from './Loader';

//Providers
const PodcastsProvider = React.lazy(() => import('../contexts/PodcastsContext'));
const VideosProvider = React.lazy(() => import('../contexts/VideoContext'));
const BookProvider = React.lazy(() => import('../contexts/BookContext'));
const ActivitiesProvider = React.lazy(() => import('../contexts/ActivityContext'));

//Routers
const PodcastRouter = React.lazy(() => import('../routers/PodcastRouter'));
const VideoRouter = React.lazy(() => import('../routers/VideoRouter'));
const BookRouter = React.lazy(() => import('../routers/BookRouter'));
const ActivitiesRouter = React.lazy(() => import('../routers/ActivitiesRouter'));

const PlatformRouter = () => {
  return (
    <Layout>
        <Suspense fallback={<Loader />}>
          <PodcastsProvider>
            <Route path="/platform/podcasts" component={PodcastRouter} />
          </PodcastsProvider>
          <VideosProvider>
            <Route path="/platform/videos" component={VideoRouter} />
          </VideosProvider>
          <BookProvider>
            <Route path="/platform/books" component={BookRouter} />
          </BookProvider>
          <ActivitiesProvider>
            <Route path="/platform/activities" component={ActivitiesRouter} />
          </ActivitiesProvider>
        </Suspense>
    </Layout>
  );
}

export default PlatformRouter;