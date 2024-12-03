import { combineReducers } from "redux";
import { AuthReducer } from "../Reducer/AuthReducer";
import { candidateInfoReducer } from "../Reducer/CandidateInfoReducer";
import CountryReducer from "../Reducer/CountryReducer";
import { notificationReducer } from "../Reducer/notificationReducer";
import { timeLineReducer } from "../Reducer/TimeLineReducer";
const RootReducer = combineReducers({
  countery: CountryReducer,
  auth: AuthReducer,
  timeLine: timeLineReducer,
  candidateInfo: candidateInfoReducer,
});

export default RootReducer;
