import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = []

export default (state = initialState, { type , payload }) => {
    switch (type) {
        case SET_ALERT:
            return [...state, payload ]
        case REMOVE_ALERT:

    
        default:
            return state;
    }
};