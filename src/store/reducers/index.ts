import { combineReducers } from "redux";
import { weatherReducer } from "../reducers/reducer";

const rootReducer = combineReducers({
    weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
