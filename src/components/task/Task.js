import React,{Component} from 'react';
import { Grid, Carousel, List } from 'antd-mobile';
import PropTypes from 'prop-types'
import TitleLayout from '../../layouts/TitleLayout'
import SubTitle from '../common/SubTitle'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { menuEvent} from '../../actions'

class Task extends Component {
  constructor(props) {
    super(props);
    
  
    this.state = {
      
    };
    
  }
    
  render() {
      return (
          <div style={{height:'100%'}}>
            <TitleLayout content='报表' hideBack={true}>
              

            </TitleLayout>
              
          </div>
      )
  }
}


const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(state);
  return state.task
}

const mapDispatchToProps = dispatch => ({
  changeRoute: router=>{ dispatch(push(router));}
})
export default connect(mapStateToProps, mapDispatchToProps)(Task);
