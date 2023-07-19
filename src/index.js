import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios';


const elementList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};


// this is the saga that will watch for actions
function* rootSaga() {
    // listen for an action, then do something when that action is dispatched
    // when the FETCH_ELEMENTS action is dispatched, run fetchElements
    yield takeLatest('FETCH_ELEMENTS', fetchElements)
    yield takeLatest('ADD_ELEMENT', addElement)

}

// we have access to the action that was dispatched
function* fetchElements(action) {
    console.log('fetch elements was dispatched with action:', action);

    // historically we've done promise chaining (.then.catch) but now we
    // don't need to do that because of yield generator magic

    // try/catch: similar to a .then.catch, but with new syntax for sagas
    // Do all the things in the try block, if there's an error catch it and 
    // do whatever's in the catch block
    try {
        const elementResponse = yield axios.get('api/element');
        // dispatch an action to update the redux store
        // 'put' is the same thing as 'dispatch' in our React components!
        // we can't use 'dispatch' because we get dispatch from useDispatch,
        // which is a Reach-specific thing
        yield put({ type: 'SET_ELEMENTS', payload: elementResponse.data })

    } catch (error) {
        console.log('error fetching elements:', error);
    };



}

// add element saga
// we have access to the action that was dispatched
function* addElement(action) {
    // make a post request!
    try {
        yield axios.post('/api/element', {
            name: action.payload
        })
    // dispatch the FETCH_ELEMENTS action to trigger a GET request and get all the elements.
        yield put({type: 'FETCH_ELEMENTS'})

    } catch (error) {
        console.log('error with post element:', error);
    }
}



const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
