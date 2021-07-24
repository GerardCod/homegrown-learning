import React, { createContext, useCallback, useReducer, useRef } from 'react';
import { database } from '../firebase';
import { FETCH_COLLECTION, LOADING, ERROR } from '../reducers/Actions';
import VideoReducer, { initialState } from '../reducers/VideoReducer';
import { collectIdAndData } from '../utils';

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, initialState);
  const collectionRef = useRef({});

  const fetchVideos = useCallback(({onError}) => {
    dispatch({type: LOADING});
    collectionRef.current = database.collection('videos').onSnapshot(
      snapshot => {
        const collection = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_COLLECTION, payload: collection});
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
    fetchVideos,
  };
  
  return (
    <VideoContext.Provider value={childProps}>
      { children }
    </VideoContext.Provider>
  );
}

export default VideoProvider;