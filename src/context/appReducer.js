import { actionTypes } from './contextTypes';

const appReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}

export default appReducer;

/*
action = {
    type: string SET_USER,
    payload: {
        user
    }
}

*/