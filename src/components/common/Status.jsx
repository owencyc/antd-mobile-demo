import React, { Component } from 'react'
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import {imageMap} from './syspara'

const myImg = src => <img style={{width:'60px',height:'60px'}} src={src} className="spe am-icon am-icon-md" alt="" />;

class Status extends Component {

    
    render() {
        return (
            <div >
                <Result
                    img={myImg(imageMap[this.props.location.state.value])}
                    title="提交成功"
                    message={<div>请耐心等待处理</div>}
                />
            </div>
        )
    }
}

export default Status;