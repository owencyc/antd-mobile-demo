import 'babel-polyfill';
import React from 'react';
import './index.css';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { history,configureStore } from './configureStore'
import { ConnectedRouter } from 'connected-react-router'
import AppRouter from './routers'



const store = configureStore()


render(
  <Provider store={store}>
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
