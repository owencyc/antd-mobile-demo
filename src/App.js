import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import AppRouter from './routers'

const App = ({ history }) => {
  return (
    <div className="App">
        <AppRouter></AppRouter>
      </div>
  )
}

export default App