import React, { createContext, useCallback, useReducer, useRef } from 'react';
import { database } from '../firebase';
import { FETCH_COLLECTION, LOADING, ERROR, FETCH_DOCUMENT, RESPONSE_SUCCESSFUL } from '../reducers/Actions';
import VideoReducer, { initialState } from '../reducers/VideoReducer';
import { collectIdAndData, sortItems } from '../utils';

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, initialState);
  const collectionRef = useRef({});
  const documentRef = useRef({});

  const fetchVideos = useCallback(({onError}) => {
    dispatch({type: LOADING});
    collectionRef.current = database.collection('videos').onSnapshot(
      snapshot => {
        const collection = snapshot.docs.map(collectIdAndData);
        const sortedDocs = sortItems(collection);
        dispatch({type: FETCH_COLLECTION, payload: sortedDocs});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const fetchVideo = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    documentRef.current = database.doc(`videos/${id}`).onSnapshot(
      snapshot => {
        const doc = collectIdAndData(snapshot);
        dispatch({type: FETCH_DOCUMENT, payload: doc});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    );
  }, []);

  const addComment = useCallback(async (video, comment, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!video.comments) {
        video.comments = [];
      }

      video.comments.push(comment);
      await database.doc(`videos/${video.id}`).update(video);
      dispatch({type: RESPONSE_SUCCESSFUL});
      onSuccess('Tu comentario fue agregado exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message)
    }
  }, []);

  const addView = useCallback(async (video, user, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      if (!video.views) {
        video.views = [];
      }

      video.views.push(user);
      await database.doc(`videos/${video.id}`).update(video);
      dispatch({type: RESPONSE_SUCCESSFUL});
      onSuccess(`Acabas de ver ${video.title}`);
    } catch(error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const childProps = {
    state,
    collectionRef,
    documentRef,
    fetchVideos,
    fetchVideo,
    addComment,
    addView,
  };
  
  return (
    <VideoContext.Provider value={childProps}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;