import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import { history } from '../../configureStore'


class Title extends Component {

    render() {
        return (
            <div className='title-panel'>
                {this.props.hideBack?'':(<div className='back'>
                    {/* <Link to={this.props.backTo?this.props.backTo:'/main'}></Link> */}
                    <Icon type='left' size='lg' style={{color:'white'}} 
                        onClick={()=>{
                            this.props.backTo?history.push(this.props.backTo):history.goBack()
                        }}/>
                </div>)
                
                }
                
                <div className='title'>{this.props.content}</div>
            </div>
        )
    }
}

export default Title;