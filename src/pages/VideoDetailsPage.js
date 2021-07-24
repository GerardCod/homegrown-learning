import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';
import Loader from '../components/Loader';
import { VideoContext } from '../contexts/VideoContext';
import { onError } from '../utils';

const VideoDetailsPage = () => {
  const { id } = useParams();
  const { state, fetchVideo, documentRef } = useContext(VideoContext);

  useEffect(() => {
    fetchVideo(id, {onError});
    const subscriber = documentRef.current;

    return () => {
      subscriber();
    }

  }, [fetchVideo, documentRef, id]);

  const handleEnd = () => {
    console.log('Video ended');
  }

  return (
    <Fragment>
      <Back backUrl="/platform/videos" />
      {
        state.videoSelected ?
        <div>
          <h2 className="Page__Title">{state.videoSelected.title}</h2>
          <video controls onEnded={handleEnd} className="width--full">
            <source src={state.videoSelected.url} type="video/mp4" />
          </video>
        </div> :
        <Loader />
      }
    </Fragment>
  );
}

export default VideoDetailsPage;