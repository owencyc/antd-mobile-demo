import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import home from './HomeReducer'
import main from './MainReducer'
import feedback from './FeedbackReducer'
import reserve from './ReserveReducer'
import error from './ErrorReducer'
import status from './StatusReducer'
import search from './SearchReducer'
import user from './UserReducer'
//多个redeucer时，整合为一个rootReducer


export default (history) => combineReducers({
  router: connectRouter(history),
  main , home , feedback ,error,user,status,search,reserve
})