import {
    REQUEST_ROUTES,
    REQUEST_ROUTES_SUCCESS,
    REQUEST_ROUTES_FAILURE
} from '../constants/actionTypes'

const initialState = {
    routes: [],
    loading: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_ROUTES:
            return {
                ...state,
                loading: true
            };
        case REQUEST_ROUTES_SUCCESS:
            return {
                ...state,
                routes: action.payload,
                loading: false
            };
        case REQUEST_ROUTES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}