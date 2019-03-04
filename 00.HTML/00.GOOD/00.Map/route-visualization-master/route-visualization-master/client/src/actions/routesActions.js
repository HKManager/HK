import {
    REQUEST_ROUTES,
    REQUEST_ROUTES_SUCCESS,
    REQUEST_ROUTES_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'

const requestRoutes = () => {
    return {
        type: REQUEST_ROUTES
    }
}

const requestRoutesSuccess = response => {
    return {
        type: REQUEST_ROUTES_SUCCESS,
        payload: response
    }
}

const requestRoutesFailure = (err) => {
    return {
        type: REQUEST_ROUTES_FAILURE,
        error: err
    }
}

export const fetchRoutes = () => dispatch => {
    dispatch(requestRoutes());
    axios.get('/api/points')
        .then(response => dispatch(requestRoutesSuccess(response.data)))
        .catch(err => dispatch(requestRoutesFailure(err)))
};