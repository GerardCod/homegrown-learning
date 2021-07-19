import React, { Fragment, useContext, useEffect } from 'react';
import PodcastItem from '../components/PodcastItem';
import { PodcastsContext } from '../contexts/PodcastsContext';
import { onError } from '../utils';
import Loader from '../components/Loader';
import Empty from '../components/Empty';

const PodcastsPage = () => {
  const { state, fetchCollection, collectionRef } = useContext(PodcastsContext);

  useEffect(() => {
    fetchCollection({ onError });
    const subscribe = collectionRef.current;

    return () => {
      subscribe();
    };
  }, [collectionRef, fetchCollection]);

  return (
    <Fragment>
      <h2 className="Page__Title">Podcast subidos a la plataforma</h2>
      <div className="flex flex--column items--center">
        {
          state.loading ?
            <Loader /> :
            (state.podcasts && state.podcasts.length > 0) ?
              state.podcasts.map((element) => <PodcastItem podcast={element} key={`podcast: ${element.id}`} />) :
              <Empty message="No hay podcasts en la plataforma" />
        }
      </div>
    </Fragment>
  );
};

export default PodcastsPage;