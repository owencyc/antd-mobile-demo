import React, { Component } from 'react'
import { Result, Icon, WhiteSpace,Button } from 'antd-mobile';
import {imageMap} from './syspara'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { menuEvent} from '../../actions'

const myImg = src => <img style={{width:'60px',height:'60px'}} src={src} className="spe am-icon am-icon-md" alt="" />;

class Status extends Component {

    
    render() {
        return (
            <div >
                <Result
                    img={myImg(imageMap[this.props.location.state.value])}
                    title="提交成功"
                    message={<div><p>{this.props.location.state.data}</p>请耐心等待处理</div>}
                />
                <Button type="ghost" onClick={()=>this.props.goTask()}>查看进度</Button><WhiteSpace />
                <Button type="primary" onClick={()=>this.props.goHome()}>返回</Button><WhiteSpace />
            </div>
        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    //console.log(state);
    return state.status
  }

const mapDispatchToProps = dispatch => ({
    goTask: ()=>{ dispatch(push('/main'));dispatch(menuEvent('/task',1));},
    goHome: ()=>{ dispatch(push('/main'));}
  })

export default connect(mapStateToProps, mapDispatchToProps)(Status);
//export default Status;