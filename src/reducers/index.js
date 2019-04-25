import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import app from './AppReducer'
import home from './HomeReducer'
import chart from './ChartReducer'
import main from './MainReducer'
import feedback from './FeedbackReducer'
import reserve from './ReserveReducer'
import error from './ErrorReducer'
import status from './StatusReducer'
import search from './SearchReducer'
import user from './UserReducer'
import calendar from './CalendarReducer'
//多个redeucer时，整合为一个rootReducer


export default (history) => combineReducers({
  router: connectRouter(history),
  app,main , home ,chart, feedback ,error,user,status,search,reserve,calendar
})