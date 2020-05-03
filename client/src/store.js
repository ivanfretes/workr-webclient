import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'react-thunk'
import rootReducers from './reducers'

const initialState = {};

const middlewate = [thunk]

const store = createStore(
    rootReducers, 
    initialState,
    composeWithDevTools(applyMiddleware(...middlewate))
)

export default store;





