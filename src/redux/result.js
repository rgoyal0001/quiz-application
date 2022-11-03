const initialState = {
    correct: 0,
    wrong: 0,
    score :0
  };
  
  
  export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case 'CORRECT': {
        return {
          ...state,
          correct: state.correct + payload
        };
      }
      case 'WRONG': {
        return {
          ...state,
          wrong: state.wrong - payload
        };
      }
      case 'SCORE': {
        return {
          ...state,
          score: state.score - payload
        };
      }
      default: {
        return state;
      }
    }
  };
  