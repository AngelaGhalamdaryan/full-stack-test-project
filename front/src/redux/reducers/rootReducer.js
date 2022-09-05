import { combineReducers } from 'redux';
import { pageLoadReducer, userReducer } from './index';

const rootReducer = combineReducers({
    pageLoad: pageLoadReducer,
    user: userReducer,
});

export default rootReducer;