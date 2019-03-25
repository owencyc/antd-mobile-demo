import React,{Component} from 'react';
import { Grid, Carousel, NoticeBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import TitleLayout from '../../layouts/TitleLayout'
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
            <TitleLayout content='工作组件' hideBack={true}>
              <Grid data={this.props.funcs} columnNum={3} activeStyle={false} hasLine={false} onClick={(dataItem)=>this.props.changeRoute(dataItem.router)} />

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
