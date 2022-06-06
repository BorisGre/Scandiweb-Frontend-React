import React from 'react';
import ReactDOM from 'react-dom';
import { Context } from './components/context';
import { Provider } from 'react-redux';
import { createStore, bindActionCreators, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import * as ActionCreators from './actions/actions';
import boundingActions from './actions/boundingActions';

import App from './App';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { localStorageRead } from './helpers/localStorageHelper';

const storageID = "ScandiwebTestTask";
const localStorageObj = localStorageRead(storageID);

const middleWares = [thunk]
const store = createStore(
    rootReducer(localStorageObj), 
    compose(
            applyMiddleware(...middleWares),
            //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const boundedActions = boundingActions(bindActionCreators, store.dispatch, ActionCreators)
const keys = ['End', 'PageDown', 'ArrowDown']
const wheel = (e) => console.log(`EVENT`, e, e.pageY, e.clientY, e.deltaY)
const key = (e) => console.log(`key`, e.key, keys.includes(e.key))
const scroll = (e) => console.log(`scroll`, e)

ReactDOM.render(
    <Provider store={store}>
        <Context.Provider value={boundedActions}>
            <App storageID={storageID} onScroll={scroll} onKeyDown={key} onWheel={wheel} tabIndex="1"/>
        </Context.Provider>
    </Provider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
