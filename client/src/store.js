import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers'
import thunk from "redux-thunk";

const initialState = {};

const middlewate = [thunk]

const store = createStore(
    rootReducers, 
    initialState,
    composeWithDevTools(applyMiddleware(...middlewate))
)

export default store;





