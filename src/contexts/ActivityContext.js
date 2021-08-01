import { createContext, useCallback, useReducer, useRef } from "react";
import ActivityReducer, { initialState } from '../reducers/AcitvityReducer';
import { database } from '../firebase';
import { collectIdAndData } from "../utils";
import { ERROR, FETCH_COLLECTION, LOADING } from "../reducers/Actions";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  const collectionRef = useRef({});

  const fetchActivities = useCallback(({onError}) => {
    dispatch({type: LOADING});
    collectionRef.current = database.collection('activities').onSnapshot(
      snapshot => {
        const activities = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_COLLECTION, payload: activities});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const childProps = {
    state,
    collectionRef,
    fetchActivities,
  }

  return (
    <ActivityContext.Provider value={ childProps }> 
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;