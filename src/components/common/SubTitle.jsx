import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';

class SubTitle extends Component {

    render() {
        return (
            <div>
                <div className='sub-title'>{this.props.renderHeader}</div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SubTitle;