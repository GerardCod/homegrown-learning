import React, { Fragment, useEffect, useContext } from 'react';
import { ActivityContext } from '../contexts/ActivityContext';
import Loader from '../components/Loader';
import Empty from '../components/Empty';
import { onError } from '../utils';
import ActivityItem from '../components/ActivityItem';

const ActivitiesPage = () => {
  const { state, collectionRef, fetchActivities } = useContext(ActivityContext);

  useEffect(() => {
    fetchActivities({ onError });
    const subscriber = collectionRef.current;

    return () => {
      subscriber();
    }
  }, [collectionRef, fetchActivities]);

  return (
    <Fragment>
      <h2 className="Page__Title">Actividades subidas a la plataforma.</h2>
      <div className="flex flex--column items--center">
        {
          state.loading ?
            <Loader /> :
            (state.activities && state.activities.length > 0) ?
            state.activities.map(element => <ActivityItem activity={element} key={`activity: ${element.id}`} />) :
            <Empty message="No hay actividades asignadas" />
        }
      </div>
    </Fragment>
  );
}

export default ActivitiesPage;