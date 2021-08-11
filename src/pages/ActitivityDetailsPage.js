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
  const { state, fetchActivity, documentRef } = useContext(ActivityContext);
  const { getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchActivity(id, { onError });
    const subscriber = documentRef.current;
    return () => {
      subscriber();
    }
  }, [id, documentRef, fetchActivity]);

  return (
    <Fragment>
      <Back backUrl="/platform/activities" />
      {
        state.activitySelected ?
        <div>
          <h2 className="Page__Title">{state.activitySelected.title}</h2> 
          <p>{state.activitySelected.description}</p>
          {
            (state.activitySelected.submits && state.activitySelected.submits.filter(s => s.user.email === getCurrentUser().email).length > 0) ?
            <h3>Ya entregaste esta actividad</h3> :
            (state.activitySelected.submitType === 'comment') ?
            <SubmitComment activity={ state.activitySelected } /> :
            <SubmitEvidence activity={ state.activitySelected } email={getCurrentUser().email} />
          }
          
        </div> :
        <Loader />
      }
    </Fragment>
  );
}

export default ActivityDetailsPage;