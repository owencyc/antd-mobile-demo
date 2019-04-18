import React from 'react';
import { Grid, List, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import './user.css'
import img from './../../assets/avatar1.svg'
import { hidden } from 'ansi-colors';
import { connect } from 'react-redux'

const Item=List.Item;

const User = (props) => {
  console.log(props)
  return (
    <div className='user'>
      <div className='user-title-panel'>
        <div className="user-avatar" >
          <img src={props.info.avatar?props.info.avatar:img} alt="avatar" style={{width:'100%',height:'100%',borderRadius:'50%'}} />
        </div>
        <div className="user-info">
          <div className="name">{props.info.user_name}</div>
          <div className="other">{props.info.dept_no}</div>
          <div className="other">{props.info.in_days ? "这是您在鼎捷的第" + props.info.in_days + "天^_^" : ""}</div>
        </div>
      </div>
      <div>
        <Grid data={props.funcs} activeStyle={false} hasLine={false} onClick={(dataItem) => props.changeRoute(dataItem.router)} />
      </div>
      <WhiteSpace size="sm" style={{ backgroundColor: '#f5f5f9' }} />
      <List className="my-list">
        <Item
          arrow="horizontal"
          thumb='http://221.226.187.245:8888/icon/chart_bar.svg'
          onClick={() => { props.changeRoute('/prschart') }}
        >预估兑现</Item>
        <WhiteSpace size="sm" style={{ backgroundColor: '#f5f5f9' }} />
      </List>

    </div>
  )
}


//container
const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(formShape);
  return state.user
}

const mapDispatchToProps = dispatch => ({
  imgChange: (files, type, index) => { },
  changeRoute: router=>{ dispatch(push(router));}
})

export default connect(mapStateToProps, mapDispatchToProps)(User);