import React, { createContext, useCallback, useReducer, useRef } from 'react';
import AssessmentReducer, { initialState } from '../reducers/AssessmentReducer';
import { ERROR, FETCH_COLLECTION, FETCH_DOCUMENT, LOADING, RESPONSE_SUCCESSFUL } from '../reducers/Actions';
import { database } from '../firebase';
import { collectIdAndData, sortItems } from '../utils';

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
        const sortedAssessments = sortItems(assessments);
        dispatch({type: FETCH_COLLECTION, payload: sortedAssessments});
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

  const addAssessmentSubmit = useCallback(async function callback(assessment, submit, { onError }) {
    dispatch({type: LOADING});
    try {
      if (!assessment.submits) {
        assessment.submits = [];
      }

      assessment.submits.push(submit);
      await database.doc(`assessments/${assessment.id}`).update(assessment);
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
    fetchCollection,
    fetchAssessment,
    addAssessmentSubmit,
  }

  return (
    <AssessmentContext.Provider value={ childProps }>
      { children }
    </AssessmentContext.Provider>
  );
} 

export default AssessmentProvider;