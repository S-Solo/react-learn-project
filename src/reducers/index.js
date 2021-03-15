import { createStore } from 'redux';
import { reduxActionTypes } from './reduxActionTypes';

const initialState = {
    count: 5,
    posts: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case reduxActionTypes.SET_POSTS:
            console.log(action)
            return {
                ...state,
                posts: action.payload.posts
            }
        case reduxActionTypes.GET_MORE_POSTS:
            console.log(action)
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
            }
        default:
            return state;
    }
}

export const store = createStore(reducer);