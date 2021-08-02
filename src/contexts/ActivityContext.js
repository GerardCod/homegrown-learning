import { createContext, useCallback, useReducer, useRef } from "react";
import ActivityReducer, { initialState } from '../reducers/AcitvityReducer';
import { database, storage } from '../firebase';
import { collectIdAndData, generateEvidenceFile } from "../utils";
import { ERROR, FETCH_COLLECTION, FETCH_DOCUMENT, LOADING, RESPONSE_SUCCESSFUL } from "../reducers/Actions";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  const collectionRef = useRef({});
  const documentRef = useRef({});

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

  const fetchActivity = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    documentRef.current = database.doc(`activities/${id}`).onSnapshot(
      snapshot => {
        const activity = collectIdAndData(snapshot);
        dispatch({type: FETCH_DOCUMENT, payload: activity});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const addComment = useCallback(async (activity, comment, {onSuccess, onError}) => {
    dispatch({ type: LOADING });
    try {
      if (!activity.comments) {
        activity.comments = [];
      }

      activity.comments.push(comment);
      await database.doc(`activities/${activity.id}`).update(activity);
      dispatch({ type: RESPONSE_SUCCESSFUL });
      onSuccess('Se ha agregado tu comentario exitosamente');
    } catch (error) {
      dispatch(error.message);
      onError(error.message);
    }
  }, []);

  const addSubmit = useCallback(async (activity, submit, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!activity.submits) {
        activity.submits = [];
      }

      activity.submits.push(submit);
      await database.doc(`activities/${activity.id}`).update(activity);
      dispatch({type: RESPONSE_SUCCESSFUL});
      onSuccess('Tu trabajo ha sido entregado');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const addFileToSubmit = useCallback(async (submit, file, {setSubmit, onError, email}) => {
    dispatch({ type: LOADING });
    try {
      const fileName = `submit-${email}-${Date.now()}`;
      const urlRef = await storage.ref().child('submits').child(fileName).put(file);
      const url = await urlRef.ref.getDownloadURL();
      const newEvidenceFile = generateEvidenceFile(url, fileName, file.name);
      setSubmit({
        ...submit,
        evidences: [...submit.evidences, newEvidenceFile],
      });
      dispatch({type: RESPONSE_SUCCESSFUL});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const childProps = {
    state,
    collectionRef,
    documentRef,
    fetchActivities,
    fetchActivity,
    addComment,
    addSubmit,
    addFileToSubmit
  }

  return (
    <ActivityContext.Provider value={ childProps }> 
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;