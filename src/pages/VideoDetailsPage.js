import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import Back from '../components/Back';

const VideoDetailsPage = () => {
  const { id } = useParams();
  
  return (
    <Fragment>
      <Back backUrl="/platform/videos" />
      <h2>Detalle de vídeo</h2>
    </Fragment>
  );
}

export default VideoDetailsPage;