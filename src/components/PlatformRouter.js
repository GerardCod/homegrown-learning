import React, { Suspense } from 'react';
import Layout from './Layout';
import { Route } from 'react-router';
import Loader from './Loader';
import BooksPage from '../pages/BooksPage';

//Providers
const PodcastsProvider = React.lazy(() => import('../contexts/PodcastsContext'));
const VideosProvider = React.lazy(() => import('../contexts/VideoContext'));
const BookProvider = React.lazy(() => import('../contexts/BookContext'));

//Routers
const PodcastRouter = React.lazy(() => import('../routers/PodcastRouter'));
const VideoRouter = React.lazy(() => import('../routers/VideoRouter'));

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
            <Route path="/platform/books" component={BooksPage} />
          </BookProvider>
        </Suspense>
    </Layout>
  );
}

export default PlatformRouter;