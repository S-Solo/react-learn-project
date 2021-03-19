import { reduxActionTypes } from 'reducers/reduxActionTypes';

export const setReduxPosts = (posts) => ({
    type: reduxActionTypes.SET_POSTS,
    payload: {
        posts,
    }
});
export const getReduxPosts = (posts) => ({
    type: reduxActionTypes.GET_MORE_POSTS,
    payload: {
        posts,
    }
});
export const setPostsHasMore = (hasMore) => ({
    type: reduxActionTypes.SET_POSTS_HAS_MORE,
    payload: {
        hasMore,
    }
})