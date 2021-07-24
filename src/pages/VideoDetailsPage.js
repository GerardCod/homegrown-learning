import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import AddPodcastComment from '../components/AddPodcastComment';
import Back from '../components/Back';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import { AuthContext } from '../contexts/AuthContext';
import { VideoContext } from '../contexts/VideoContext';
import { generateComment, onError, onSuccess } from '../utils';

const VideoDetailsPage = () => {
  const { id } = useParams();
  const { state, fetchVideo, documentRef, addComment } = useContext(VideoContext);
  const { getCurrentUser } = useContext(AuthContext);

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

  const submitVideoComment = ({comment}) => {
    const user = getCurrentUser();
    const newComment = generateComment(comment, user);
    addComment(state.videoSelected, newComment, {onSuccess, onError});
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

          <AddPodcastComment submitComment={submitVideoComment} />
          <h2>Comentarios</h2>
          {
            (state.videoSelected.comments && state.videoSelected.comments.length > 0) &&
            state.videoSelected.comments.map((comment, idx) => <Comment {...comment} key={`comment: ${idx}`} />)
          }
        </div> :
        <Loader />
      }
    </Fragment>
  );
}

export default VideoDetailsPage;