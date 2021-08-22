import React, { createContext, useCallback, useReducer, useRef } from 'react';
import AssessmentReducer, { initialState } from '../reducers/AssessmentReducer';
import { ERROR, FETCH_COLLECTION, FETCH_DOCUMENT, LOADING } from '../reducers/Actions';
import { database } from '../firebase';
import { collectIdAndData } from '../utils';

export const AssessmentContext = createContext();

const AssessmentProvider = function Context({children}) {
  const [state, dispatch] = useReducer(AssessmentReducer, initialState);
  const collectionRef = useRef({});
  const documentRef = useRef({});

  const fetchCollection = useCallback(function fetchCollectionCallback({onError}) {
    dispatch({type: LOADING});
    collectionRef.current = database.collection('assessments').onSnapshot(
      snapshot => {
        const assessments = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_COLLECTION, payload: assessments});
      },
      error => {
        onError(error.message);
        dispatch({type: ERROR, payload: error.message});
      }
    );
  }, []);

  const fetchAssessment = useCallback(function fetchAssessmentById(id, { onError }) {
    dispatch({type: LOADING});
    documentRef.current = database.doc(`assessments/${id}`).onSnapshot(
      snapshot => {
        const assessment = collectIdAndData(snapshot);
        dispatch({type: FETCH_DOCUMENT, payload: assessment});
      },
      error => {
        onError(error.message);
        dispatch({type: ERROR, payload: error.message});
      }
    );
  }, []);

  const childProps = {
    state,
    collectionRef,
    documentRef,
    fetchCollection,
    fetchAssessment,
  }

  return (
    <AssessmentContext.Provider value={ childProps }>
      { children }
    </AssessmentContext.Provider>
  );
} 

export default AssessmentProvider;