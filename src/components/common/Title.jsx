import React, { Component } from 'react'

class Title extends Component {

    render() {
        return (
            <div className='title-panel'>
                <div className='title'>{this.props.content}</div>
            </div>
        )
    }
}

export default Title;