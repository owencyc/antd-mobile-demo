import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';

class Title extends Component {

    render() {
        return (
            <div className='title-panel'>
                <div className='back'>
                    <Link to='/main'><Icon type='left' size='lg' style={{color:'white'}}/></Link>
                </div>
                <div className='title'>{this.props.content}</div>
            </div>
        )
    }
}

export default Title;