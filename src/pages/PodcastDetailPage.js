import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastsContext } from '../contexts/PodcastsContext';
import Loader from '../components/Loader';
import { onError } from '../utils';

const PodcastDetailPage = () => {
  const { state, documentRef, fetchPodcast } = useContext(PodcastsContext);
  const { id } = useParams();

  useEffect(() => {
    fetchPodcast(id, { onError });
    const subscriber = documentRef.current;

    return () => {
      subscriber();
    }
  }, [id, fetchPodcast, documentRef]);

  return (
    <Fragment>
      <div className="container">
        {
          state.podcastSelected ?
            <h1>{state.podcastSelected.title}</h1> :
            <Loader />
        }
      </div>
    </Fragment>
  );
}

export default PodcastDetailPage;