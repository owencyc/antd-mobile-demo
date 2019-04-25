import React, { Component } from 'react'
import { Result, Icon, WhiteSpace,Button } from 'antd-mobile';
import {imageMap} from './syspara'
import { push,goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { menuEvent} from '../../actions'

class MyMap extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        var map = new window.qq.maps.Map(document.getElementById("container"), {
            center: new window.qq.maps.LatLng(39.916527, 116.397128),      // 地图的中心地理坐标
            zoom: 8,     // 地图缩放级别
            mapStyleId: 'style1'  // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
        });
    }
    
    render() {
        return (
            <div id='container' style={{height:'50%'}}>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    //console.log(state);
    return state.app
  }

const mapDispatchToProps = dispatch => ({
    
  })

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
//export default Status;