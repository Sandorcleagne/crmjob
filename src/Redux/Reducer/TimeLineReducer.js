import { INCREASESTEPS } from "../ActionTypes/ActionType";
const initialState = {
  activeStep: 1,
};
export const timeLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASESTEPS:
      //   return (state.activeStep = action.payload + 1);
      return Object.assign({}, state, {
        activeStep: action.payload + 1,
      });
  }
  return state;
};
