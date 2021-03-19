import { reduxActionTypes } from './reduxActionTypes';

const countReducer = (state = 0, action) => {
    switch (action.type) {
        case reduxActionTypes.INCREMENT_COUNT:
            console.log(action)
            return {
                ...state,
                count: state.count + 1
            }
        case reduxActionTypes.DECREMENT_COUNT:
            console.log(action)
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}

export default countReducer;