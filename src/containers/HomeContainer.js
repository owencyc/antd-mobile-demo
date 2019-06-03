import { connect } from 'react-redux'
import Home from '../components/home/Home'
import {navEvent} from '../actions'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router'


const mapStateToProps = state => {
  //console.log('inject:');
  //console.log(state);
  return state.home
}
  
  const mapDispatchToProps = dispatch => ({
    changeRoute: router =>{ dispatch(navEvent(router));dispatch(push(router))},
    push
  })

export default connect(mapStateToProps,mapDispatchToProps)(Home)