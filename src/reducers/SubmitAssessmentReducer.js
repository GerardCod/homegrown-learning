
export const initialState = {
  questions: null,
  score: 0,
  currentQuestionIndex: 0,
}

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const PREVIOUS_QUESTION = 'PREVIOUS_QUESTION';
export const SUBMIT_ASSESSMENT = 'SUBMIT_ASSESSMENT';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

const reduceScore = function reduceQuestions(questions) {
  let acum = 0;
  for (let question of questions) {
    if (question.answerSelected && question.answerSelected.answer === question.correctAnswer.answer) {
      acum += (10 / questions.length);
    }
  }
  return acum;
}

const SubmitAssessmentReducer = (state, action) => {
  const states = {
    NEXT_QUESTION: {
      ...state,
      currentQuestionIndex: (state.currentQuestionIndex < state.questions.length - 1) ?
        state.currentQuestionIndex + 1 :
        state.currentQuestionIndex
    },
    PREVIOUS_QUESTION: {
      ...state,
      currentQuestionIndex: (state.currentQuestionIndex > 0) ?
        state.currentQuestionIndex - 1 :
        state.currentQuestionIndex
    },
    ANSWER_QUESTION: {
      ...state,
      questions: state.questions.map(q => {
        if (action.payload && q.id === action.payload.id) {
          q.answerSelected = action.payload.answer;
        }
        return q;
      }),
    },
    SUBMIT_ASSESSMENT: {
      ...state,
      score: reduceScore(state.questions),
    },
  };

  return states[action.type] || state;
}

export default SubmitAssessmentReducer;