import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastsContext } from '../contexts/PodcastsContext';
import Loader from '../components/Loader';
import { generateComment, onError, onSuccess } from '../utils';
import Back from '../components/Back';
import AddPodcastComment from '../components/AddPodcastComment';
import Comment from '../components/Comment';
import { AuthContext } from '../contexts/AuthContext';
import TextDescription from '../components/TextDescription';

const PodcastDetailPage = () => {
  const { state, documentRef, fetchPodcast, addHeardPodcast, addPodcastComment } = useContext(PodcastsContext);
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

  const submitPodcastComment = ({comment}) => {
    const user = getCurrentUser();
    const newComment = generateComment(comment, user);
    addPodcastComment(state.podcastSelected, newComment, {onSuccess, onError});
  }

  return (
    <Fragment>
      <Back backUrl="/platform/podcasts" />
      {
        state.podcastSelected ?
          <div>
            <br />
            <h2 className="Page__Title">{state.podcastSelected.title}</h2>
            <br />
            <TextDescription text={state.podcastSelected.description} />
            <br />
            <audio controls onEnded={hearPodcast}>
              <source src={state.podcastSelected.url} type="audio/mp3" />
            </audio>
            <br />
            <br />
            {
              (getCurrentUser().role.name === 'Estudiante') && <AddPodcastComment submitComment={submitPodcastComment} />
            }
            
            <br />
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