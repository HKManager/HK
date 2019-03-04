import { combineReducers } from 'redux';
import routesReducer from './routesReducer';

export default combineReducers({
    routes: routesReducer
});