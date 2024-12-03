import { COUNTRY } from "../ActionTypes/ActionType";

const initial = {
    Country : []
}

const CountryReducer = (state = initial , action) => {
    switch (action.type) {
        case COUNTRY:
            console.log("action", action.payload)
      
            return {...state , COUNTRY:[...state.Country , action.payload]}
    }
    return state;
}

export default CountryReducer;