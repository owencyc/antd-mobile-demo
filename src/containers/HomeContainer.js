import { connect } from 'react-redux'
import Home from '../components/home/Home'
import {navEvent} from '../actions'

const mapStateToProps = state => {
  console.log('inject:');
  console.log(state);
  return {
    imgs: state.home.imgs,
    funcs:state.home.funcs
  }
}
  
  const mapDispatchToProps = dispatch => ({
    changeRoute: router => dispatch(navEvent(router))
  })

export default connect(mapStateToProps,mapDispatchToProps)(Home)