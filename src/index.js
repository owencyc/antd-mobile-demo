import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { Route, Switch,BrowserRouter } from 'react-router-dom' // react-router v4
import {  createStore } from 'redux'
import IndexRouter from './routers'
import { history,configureStore } from './configureStore'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'
import AppRouter from './routers'



const store = configureStore()


render(
  <Provider store={store}>
   { /* place ConnectedRouter under Provider */}
    <ConnectedRouter history={history}>
        <AppRouter></AppRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)


// render(
//   <Provider store={store}>
//     <BrowserRouter>
//         <IndexRouter/>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
