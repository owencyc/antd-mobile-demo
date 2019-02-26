import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import AppRouter from './routers'
import Main from './layouts/Main'
import './App.css'
import { Router, Route, Switch, Redirect } from 'react-router'

const App = ({ history }) => {
  return (
    <div className="App">
        <div className='App_content'>
          <AppRouter></AppRouter>
        </div>
        <Main></Main>
      </div>
  )
}

export default App