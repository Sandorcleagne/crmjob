import { GETCANDIDATEINFO } from "../ActionTypes/ActionType";

const initialState = {
  candidateInfo: [],
};

export const candidateInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETCANDIDATEINFO:
      return Object.assign({}, state, {
        candidateInfo: action.payload,
      });
  }
  return state;
};
