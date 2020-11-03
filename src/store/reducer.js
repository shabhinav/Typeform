import Ques from "../quiz";

const intialState = {
  ques: [...Ques],
};

const reducer = (state = intialState, action) => {
  if (action.type === "quiz") {
    return {
      ques: action.quizques,
    };
  }
  return state;
};

export default reducer;
