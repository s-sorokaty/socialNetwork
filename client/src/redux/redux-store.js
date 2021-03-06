import { applyMiddleware, combineReducers, createStore } from 'redux'
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';
import {reducer as fromReducer} from "redux-form"
import thunk from 'redux-thunk'
import appReducer from './appReducer';

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    authReducer: authReducer,
    form: fromReducer,
    appReducer:appReducer
});

let store = createStore(redusers, applyMiddleware(thunk));

window.store = store;

export default store;