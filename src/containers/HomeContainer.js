import { connect } from 'react-redux'
import Home from '../components/home/Home'
import {navEvent} from '../actions'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router'


const mapStateToProps = state => {
  console.log('inject:');
  console.log(state);
  return {
    imgs: state.home.imgs,
    funcs:state.home.funcs
  }
}
  
  const mapDispatchToProps = dispatch => ({
    changeRoute: router => dispatch(push(router)),
    push
  })

export default connect(mapStateToProps,mapDispatchToProps)(Home)