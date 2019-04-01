import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import AppRouter from './routers'
import Main from './layouts/Main'
import './App.css'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Modal ,Toast} from 'antd-mobile';
import { history } from './configureStore'
import {getToken,getUserinfo,getPara,getJsConfig } from './services'
import { appLoad,homeNotice,appJs,appUrl } from './actions'
const alert = Modal.alert;

class App extends Component {

  componentDidMount(){
    
    console.log('初始化数据');

    if(this.props.location.search && !this.props.loaded){
      
      let url=encodeURIComponent(window.location.href);
      const searchParams = new URLSearchParams(this.props.location.search)
      console.log(searchParams.get('code'));
      if(searchParams.get('code')){
        localStorage.setItem("wc_user",searchParams.get('code')); 
        //在此component中完成所有数据的初始化，并重新dispatch各个store，本页面loading，加载完毕跳转到home
        Toast.loading('正在初始化',0);
        //获取用户信息
        getUserinfo(searchParams.get('code')).then((user)=>{
          //需判断是否有错
          if(user.status===0){
            localStorage.setItem("user_info",JSON.stringify(user.result)); 
          }else{
            Toast.offline(user.exception, 2);
          }
          this.props.load();
        }).then(()=>{
          return getPara()
        }).then((paras)=>{
            console.log(paras);
            if(paras.status===0){
              this.props.updateNotice(paras.result[0].label)
            }
        }).then(()=>{
          this.props.updateAppUrl(url)
          return getJsConfig(url)
        }).then((config)=>{
          if(config.status===0){
            //wechat js 认证
            this.props.updateAppjs(config.result.signature)
            window.wx.config({
              beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: config.result.appId, // 必填，企业微信的corpID
              timestamp: +config.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: config.result.nonceStr, // 必填，生成签名的随机串
              signature: config.result.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
              jsApiList: ['closeWindow'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
            });
            Toast.hide();
            this.props.goMain();
          }
        })
        
        //history.push('/home');
      }else{
        Toast.offline('获取微信认证失败！', 2);
      }
    }else{
      //关闭微信
      window.wx.closeWindow();
    }
  }
  
  render() {
    
    return (
      <div >
        <div className="App">
          <div className='App_content'>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return state.app
}

const mapDispatchToProps = dispatch => ({
  load:()=>{dispatch(appLoad())},
  updateNotice:(notice)=>{dispatch(homeNotice(notice))},
  updateAppjs:(data)=>{dispatch(appJs(data))},
  updateAppUrl:(data)=>{dispatch(appUrl(data))},
  goMain:()=>{dispatch(push('/main'))},
  dispatch
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
//export default App