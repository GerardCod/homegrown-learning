import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastsContext } from '../contexts/PodcastsContext';
import Loader from '../components/Loader';
import { onError } from '../utils';
import Back from '../components/Back';
import AddPodcastComment from '../components/AddPodcastComment';

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
      <main className="Page">
        <div className="container">
          <Back backUrl="/platform/podcasts" />
          {
            state.podcastSelected ?
              <div>
                <h1>{state.podcastSelected.title}</h1>
                <p>{state.podcastSelected.description}</p>
                <audio controls>
                  <source src={state.podcastSelected.url} type="audio/mp3" />
                </audio>

                <AddPodcastComment podcast={state.podcastSelected} />
                <h2>Comentarios</h2>
                {
                  (state.podcastSelected.comments && state.podcastSelected.comments.length > 0) &&
                  state.podcastSelected.comments.map((comment, idx) => <p key={`comment: ${idx}`}>{comment}</p>)
                }
              </div>
              : <Loader />
          }
        </div>
      </main>
    </Fragment>
  );
}

export default PodcastDetailPage;