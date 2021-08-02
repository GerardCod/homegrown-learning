import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddPodcastComment from '../components/AddPodcastComment';
import Back from '../components/Back';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import SubmitComment from '../components/SubmitComment';
import SubmitEvidence from '../components/SubmitEvidence';
import { ActivityContext } from '../contexts/ActivityContext';
import { AuthContext } from '../contexts/AuthContext';
import { generateComment, onError, onSuccess } from '../utils';

const ActivityDetailsPage = () => {
  const { id } = useParams();
  const { state, fetchActivity, documentRef, addComment } = useContext(ActivityContext);
  const { getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchActivity(id, { onError });
    const subscriber = documentRef.current;
    return () => {
      subscriber();
    }
  }, [id, documentRef, fetchActivity]);

  const submitComment = ({ comment }) => {
    const user = getCurrentUser();
    const newComment = generateComment(comment, user);
    addComment(state.activitySelected, newComment, { onSuccess, onError });
  }

  return (
    <Fragment>
      <Back backUrl="/platform/activities" />
      {
        state.activitySelected ?
        <div>
          <h2 className="Page__Title">{state.activitySelected.title}</h2> 
          <p>{state.activitySelected.description}</p>
          {
            (state.activitySelected.submits && state.activitySelected.submits.filter(s => s.user.name === getCurrentUser().name).length > 0) ?
            <h3>Ya entregaste esta actividad</h3> :
            (state.activitySelected.submitType === 'comment') ?
            <SubmitComment activity={ state.activitySelected } /> :
            <SubmitEvidence activity={ state.activitySelected } email={getCurrentUser().email} />
          }
          <AddPodcastComment submitComment={submitComment} />
          <h3>Comentarios</h3>
          {
            (state.activitySelected.comments && state.activitySelected.comments.length > 0) &&
            state.activitySelected.comments.map((comment, idx) => <Comment {...comment} key={`comment: ${idx}`} />)
          }
        </div> :
        <Loader />
      }
    </Fragment>
  );
}

export default ActivityDetailsPage;