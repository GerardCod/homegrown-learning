import React, { createContext, useCallback, useReducer, useRef } from 'react';
import PodcastsReducer, {initialState} from '../reducers/PodcastReducer';
import { database } from '../firebase';
import { ERROR, FETCH_COLLECTION, FETCH_DOCUMENT, LOADING } from '../reducers/Actions';
import { collectIdAndData } from '../utils';

export const PodcastsContext = createContext();

const PodcastsProvider = ({children}) => {
  const [state, dispatch] = useReducer(PodcastsReducer, initialState);
  const collectionRef = useRef({});
  const documentRef = useRef({});

  const fetchCollection = useCallback(({onError}) => {
    dispatch({type: LOADING});
    collectionRef.current = database.collection('podcasts').onSnapshot(
      snapshot => {
        const documents = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_COLLECTION, payload: documents});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const fetchPodcast = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    documentRef.current = database.doc(`podcasts/${id}`).onSnapshot(
      snapshot => {
        const document = collectIdAndData(snapshot);
        dispatch({type: FETCH_DOCUMENT, payload: document});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const childProps = { fetchCollection, state, collectionRef, fetchPodcast, documentRef };

  return (
    <PodcastsContext.Provider value={childProps}>
      {children}
    </PodcastsContext.Provider>
  );
}

export default PodcastsProvider;