import React, { createContext, useCallback, useReducer, useRef } from 'react';
import PodcastsReducer, {initialState} from '../reducers/PodcastReducer';
import { database } from '../firebase';
import { ERROR, FETCH_COLLECTION, FETCH_DOCUMENT, LOADING, RESPONSE_SUCCESSFUL } from '../reducers/Actions';
import { collectIdAndData, sortItems } from '../utils';

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
        const sortedDocuments = sortItems(documents);
        dispatch({type: FETCH_COLLECTION, payload: sortedDocuments});
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

  const addPodcastComment = useCallback(async (podcast, comment, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!podcast.comments) {
        podcast.comments = [];
      }

      podcast.comments.push(comment);
      await database.doc(`podcasts/${podcast.id}`).update(podcast);
      dispatch({type: RESPONSE_SUCCESSFUL});
      onSuccess('Comentario agregado exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const addHeardPodcast = useCallback(async (podcast, user, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!podcast.heardBy) {
        podcast.heardBy = [];
      }

      podcast.heardBy.push(user);
      await database.doc(`podcasts/${podcast.id}`).update(podcast);
      dispatch({type: RESPONSE_SUCCESSFUL});
      onSuccess(`Acabas de escuchar ${podcast.title}`);
    } catch (error) {
      dispatch({type: ERROR});
      onError(error.message);
    }
  }, []);

  const childProps = { fetchCollection, state, collectionRef, fetchPodcast, documentRef, addPodcastComment, addHeardPodcast };

  return (
    <PodcastsContext.Provider value={childProps}>
      {children}
    </PodcastsContext.Provider>
  );
}

export default PodcastsProvider;