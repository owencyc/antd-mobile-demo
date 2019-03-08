import React from 'react';
import { Grid, Carousel, NoticeBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import './user.css'
import img from './../../assets/5.jpg'
import { hidden } from 'ansi-colors';
const User = (props) => {

  return (
    <div className='user'>
      <div className='user-title-panel'>
        <div className="user-avatar" >
          <img src={img} style={{width:'100%',height:'100%',borderRadius:'50%'}}/>
        </div>
      </div>

    </div>
  )
}

User.propTypes = {

}

export default User