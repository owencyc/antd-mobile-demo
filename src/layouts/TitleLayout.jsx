import React, { Component } from 'react'
import Title from '../components/common/Title'

class TitleLayout extends Component {

    render() {
        console.log('title layout')
        console.log(this.props)
        return (
            <div className='title-layout'>
                <Title content={this.props.content}></Title>
                <div className='title-layout-content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default TitleLayout;