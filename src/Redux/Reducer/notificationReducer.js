import {
  INTERVIEWNOTIFICATION,
  JOININGNOTIFICATION,
} from "../ActionTypes/ActionType";
const initialState = {
  interviewNotificationData: [],
  joiningNotificationData: [],
};
export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERVIEWNOTIFICATION:
      return Object.assign({}, state, {
        interviewNotificationData: action.payload,
      });
    case JOININGNOTIFICATION:
      return Object.assign({}, state, {
        joiningNotificationData: action.payload,
      });
  }
};
