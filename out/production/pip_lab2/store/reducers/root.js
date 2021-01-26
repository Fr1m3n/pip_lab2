import {combineReducers} from "redux";
import variablesReducer from "./variables";
import userReducer from "./user";

const initialState = {
    variables: {
        x: 1,
        y: 1,
        r: 1
    },

}

const rootReducer = combineReducers({
    variables: variablesReducer,
    user: userReducer
})

export default rootReducer;