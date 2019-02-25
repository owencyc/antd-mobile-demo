import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import home from './HomeReducer'
//多个redeucer时，整合为一个rootReducer


export default combineReducers({
    home
  })