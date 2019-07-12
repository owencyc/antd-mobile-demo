import React, { Component } from 'react';
import { TabBar,Toast } from 'antd-mobile';
import {getToken,getUserinfo,getPara,getJsConfig,GetWorkInfo,GetGlobalData } from '../services'
import { appLoad,homeUpdate,appJs,appUrl } from '../actions'
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../containers/HomeContainer'
import User from '../components/user/User'
import Chart from '../components/chart'
import Msg from '../components/msg/Msg'
import NotFound from '../components/error/404'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import {menuEvent} from '../actions'


const Content = (props) => {

  switch (props.route) {
    case 'home':
      return (<Home></Home>);
    case 'chart':
      return (<Chart></Chart>);
    case 'msg':
      return (<Msg></Msg>);
    case 'user':
      return (<User></User>);
    default:
      return (<NotFound></NotFound>);
  }
}

class Main extends Component {
  
  componentDidMount(){
    GetGlobalData('/appData.json').then((data)=>{
      console.log(data);
    })
    if(this.props.location.search && !this.props.loaded){
      
      let url=encodeURIComponent(window.location.href);
      const searchParams = new URLSearchParams(this.props.location.search)
      console.log(searchParams.get('code'));
      if(searchParams.get('code') && searchParams.get('state')){
        //新增多租户
        localStorage.setItem("wc_info",
          JSON.stringify({code:searchParams.get('code'),app:searchParams.get('state')})); 
        //在此component中完成所有数据的初始化，并重新dispatch各个store，本页面loading，加载完毕跳转到home
        Toast.loading('加载数据中',0);
        //获取用户信息
        getUserinfo(searchParams.get('code')).then((user)=>{
          if(user){
            //需判断是否有错
            Toast.hide();
            if(user.status===0){
              localStorage.setItem("user_info",JSON.stringify(user.result)); 
            }else{
              Toast.offline(user.exception, 2);
            }
            this.props.load();
          }
        }).then(()=>{
          return getPara()
        }).then((paras)=>{
            //console.log(paras);
            if(paras.status===0){
              this.props.updateHome('notice',paras.result[0].label)
            }
            return GetWorkInfo()
        }).then((info)=>{
          if(info.status===0){
            this.props.updateHome('onHand',info.result['onHand']);
            this.props.updateHome('waitEnd',info.result['waitEnd']);
            this.props.updateHome('nextUsage',info.result['nextUsage']);
          }
      }).then(()=>{
          this.props.updateAppUrl(url)
          //return getJsConfig(url)
      }).then(()=>{
        // GetGlobalData('/resumeData.json').then((data)=>{
        //   console.log(data);
        // })
      })
        // .then((config)=>{
        //   if(config.status===0){
        //     //wechat js 认证
        //     this.props.updateAppjs(config.result.signature)
        //     window.wx.config({
        //       beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //       appId: config.result.appId, // 必填，企业微信的corpID
        //       timestamp: +config.result.timestamp, // 必填，生成签名的时间戳
        //       nonceStr: config.result.nonceStr, // 必填，生成签名的随机串
        //       signature: config.result.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        //       jsApiList: ['closeWindow'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        //     });
        //   }
        // })
        
        //history.push('/home');
      }else{
        Toast.offline('获取微信认证失败！', 2);
      }
    }else{
      //关闭微信
      //window.wx.closeWindow();
    }
    if(this.props.loaded){
      GetWorkInfo().then((info)=>{
          if(info.status===0){
            this.props.updateHome('onHand',info.result['onHand']);
            this.props.updateHome('waitEnd',info.result['waitEnd']);
            this.props.updateHome('nextUsage',info.result['nextUsage']);
          }
      })
    }
  }
  render(){
  return (
    <div style={{ position: 'fixed', width: '100%',height:'100%', bottom: 0 }}>

    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      noRenderContent={false}
    >
      {this.props.menus.map(item => (
          <TabBar.Item
          title={item.title}
          key={item.key}
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: item.icon0}}
          />}
            selectedIcon={ <div style={{
              width: '22px',
              height: '22px',
              background: item.icon1}}
            />}
          selected={this.props.selectedTab === item.key}
          onPress={(item ,index)=> {
            //console.log('选择tab：'+item.title);
            //console.log(index);
            // selectedTab='Home';
            // props.push('/home');
            let obj=this.props.menus[index];
            this.props.changeRoute(obj.router,index);
            //切换路由
          }}
          data-seed="logId"
        >
          <Content route={item.key}></Content>
        </TabBar.Item>
      ))}
      
    </TabBar>
  </div>
  )
        }
}


const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(state);
  return {
    ...state.app,
    selectedTab:state.main.selectedTab,
    menus:state.main.menus
  }
}
  
  const mapDispatchToProps = dispatch => ({
    changeRoute: (router ,index)=>{ dispatch(menuEvent(router,index));},
    load:()=>{dispatch(appLoad())},
  updateHome:(name,value)=>{dispatch(homeUpdate(name,value))},
  updateAppjs:(data)=>{dispatch(appJs(data))},
  updateAppUrl:(data)=>{dispatch(appUrl(data))},
    push
  })

export default connect(mapStateToProps, mapDispatchToProps)(Main);
