import { createStore, combineReducers } from 'redux';
import postReducer from './postReducer';
import countReducer from './countReducer';

const reducers = combineReducers({
    postsData: postReducer,
    count: countReducer,
})

export const store = createStore(reducers);