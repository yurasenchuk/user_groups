import userReducer from "./userReducer";
import groupReducer from "./groupReducer";
import generalReducer from "./generalReducer";
import {combineReducers} from "redux";

const reducer = combineReducers({
    user: userReducer,
    group: groupReducer,
    general: generalReducer
});

export default reducer;