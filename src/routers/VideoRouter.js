import React from 'react';
import { Route, useRouteMatch } from 'react-router';
import VideoDetailsPage from '../pages/VideoDetailsPage';
import VideosPage from '../pages/VideosPage';

const VideoRouter = () => {
  const { path } = useRouteMatch('/platform/videos');
  
  return (
    <>
      <Route path={path} exact component={VideosPage}/>
      <Route path={`${path}/:id`} component={VideoDetailsPage} />
    </>
  );
}

export default VideoRouter;