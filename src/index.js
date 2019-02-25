import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { Route, Switch,BrowserRouter } from 'react-router-dom' // react-router v4
import {  createStore } from 'redux'
import IndexRouter from './routers'


const store = createStore(rootReducer
  )

render(
  <Provider store={store}>
    <BrowserRouter>
        <IndexRouter/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
