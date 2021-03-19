import { reduxActionTypes } from './reduxActionTypes';

const initialState = {
    posts: null,
    postsHasMore: true
}

const postReducer = (state = initialState, action) => {
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
        case reduxActionTypes.SET_POSTS_HAS_MORE:
            console.log(action)
            return {
                ...state,
                postsHasMore: action.payload.hasMore
            }
        default:
            return state;
    }
}

export default postReducer