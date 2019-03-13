import React from 'react';
import { Grid, Carousel, NoticeBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import './user.css'
import img from './../../assets/5.jpg'
import { hidden } from 'ansi-colors';
import { connect } from 'react-redux'

const User = (props) => {
  console.log(props)
  return (
    <div className='user'>
      <div className='user-title-panel'>
        <div className="user-avatar" >
          <img src={props.info.avatar} alt="avatar" style={{width:'100%',height:'100%',borderRadius:'50%'}} />
        </div>
        <div className="user-info">
          <div className="name">{props.info.user_name}</div>
          <div className="other">{props.info.dept_no}</div>
        </div>
      </div>

    </div>
  )
}

User.propTypes = {

}


//container
const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(formShape);
  return state.user
}

const mapDispatchToProps = dispatch => ({
  imgChange: (files, type, index) => { }
})

export default connect(mapStateToProps, mapDispatchToProps)(User);