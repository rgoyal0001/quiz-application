import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';
import {reducer} from './result'
const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,
    res:reducer
})

/** create store with reducer */
export default configureStore({ reducer : rootReducer});