
const addCorrect = (payload) => {
    return {
      type: 'CORRECT',
      payload
    };
  };
const addWrong = (payload) => {
    return {
      type: 'WRONG',
      payload
    };
  };
  
  const changeScore = (payload) => {
    return {
      type: 'SCORE',
      payload
    };
  };
  
  export { addCorrect, addWrong, changeScore};
  