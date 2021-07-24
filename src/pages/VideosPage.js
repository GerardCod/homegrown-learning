import React, { Fragment, useContext, useEffect } from 'react';
import Empty from '../components/Empty';
import Loader from '../components/Loader';
import VideoCard from '../components/VideoCard';
import { VideoContext } from '../contexts/VideoContext';
import { onError } from '../utils';

const VideosPage = () => {
  const { state, fetchVideos, collectionRef } = useContext(VideoContext);

  useEffect(() => {
    fetchVideos({onError});
    const subscriber = collectionRef.current;
    
    return () => {
      subscriber();
    }
  }, [collectionRef, fetchVideos]);

  return (
    <Fragment>
      <h2 className="Page__Title">Videos subidos a la plataforma</h2>
      <div className="flex flex--column items--center content--center">
        {
          state.loading ?
          <Loader /> :
          (state.videos && state.videos.length > 0) ? 
          <div className="grid VideosGrid width--full">
            {
              state.videos.map(video => <VideoCard video={video} key={`video: ${video.id}`} />) 
            }
          </div> :
          <Empty message="No hay videos en la plataforma" />
        }
      </div>
    </Fragment>
  );
}

export default VideosPage;