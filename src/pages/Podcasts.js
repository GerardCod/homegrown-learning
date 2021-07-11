import React, { Fragment, useContext, useEffect } from 'react';
import PodcastItem from '../components/PodcastItem';
import { PodcastsContext } from '../contexts/PodcastsContext';
import { onError } from '../utils';

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
      <main className="Page flex content--center">
        <div className="container">
          <h1>Podcast subidos a la plataforma</h1>
          {
            state.loading ? 
            <p>Cargando...</p> :
            (state.podcasts && state.podcasts.length > 0) ?
            state.podcasts.map((element) => <PodcastItem podcast={element} key={`podcast: ${element.id}`} />) :
            <p>No hay podcasts en la plataforma.</p>
          }
        </div>
      </main>
    </Fragment>
  );
};

export default PodcastsPage;