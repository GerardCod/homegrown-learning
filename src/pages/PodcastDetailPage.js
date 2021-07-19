import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastsContext } from '../contexts/PodcastsContext';
import Loader from '../components/Loader';
import { onError, onSuccess } from '../utils';
import Back from '../components/Back';
import AddPodcastComment from '../components/AddPodcastComment';
import Comment from '../components/Comment';
import { AuthContext } from '../contexts/AuthContext';

const PodcastDetailPage = () => {
  const { state, documentRef, fetchPodcast, addHeardPodcast } = useContext(PodcastsContext);
  const { getCurrentUser } = useContext(AuthContext); 
  const { id } = useParams();

  useEffect(() => {
    fetchPodcast(id, { onError });
    const subscriber = documentRef.current;

    return () => {
      subscriber();
    }
  }, [id, fetchPodcast, documentRef]);

  const hearPodcast = () => {
    const {name, avatar} = getCurrentUser();
    addHeardPodcast(state.podcastSelected, {name, avatar}, {onSuccess, onError});
  }

  return (
    <Fragment>
      <Back backUrl="/platform/podcasts" />
      {
        state.podcastSelected ?
          <div>
            <h2 className="Page__Title">{state.podcastSelected.title}</h2>
            <p>{state.podcastSelected.description}</p>
            <audio controls onEnded={hearPodcast}>
              <source src={state.podcastSelected.url} type="audio/mp3" />
            </audio>

            <AddPodcastComment podcast={state.podcastSelected} />
            <h2>Comentarios</h2>
            {
              (state.podcastSelected.comments && state.podcastSelected.comments.length > 0) &&
              state.podcastSelected.comments.map((comment, idx) => <Comment {...comment} key={`comment-${idx}`} />)
            }
          </div>
          : <Loader />
      }
    </Fragment>
  );
}

export default PodcastDetailPage;