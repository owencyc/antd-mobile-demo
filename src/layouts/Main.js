import React, { Component } from 'react';
import { TabBar,Icon } from 'antd-mobile';
import {allComments} from '../services'
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../containers/HomeContainer'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const Main=(props)=>{
  let selectedTab='Home';

  return (
    <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>

    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      noRenderContent={true}
    >
      <TabBar.Item
        title="首页"
        key="Home"
        icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(http://116.62.136.201/wechat/icon/home_0.svg) center center /  21px 21px no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(http://116.62.136.201/wechat/icon/home_1.svg) center center /  21px 21px no-repeat' }}
          />
          }
        selected={selectedTab === 'Home'}
        onPress={() => {
          selectedTab='Home';
          props.push('/home');
          //切换路由
        }}
        data-seed="logId"
      >
        <Home/>
      </TabBar.Item>
      <TabBar.Item
        icon={
          <div style={{
            width: '22px',
            height: '22px',
            background: 'url(http://116.62.136.201/wechat/icon/task_0.svg) center center /  21px 21px no-repeat' }}
          />
        }
        selectedIcon={
          <div style={{
            width: '22px',
            height: '22px',
            background: 'url(http://116.62.136.201/wechat/icon/task_1.svg) center center /  21px 21px no-repeat' }}
          />
        }
        title="工作"
        key="Task"
        selected={selectedTab === 'Task'}
        onPress={() => {
          selectedTab='Task';
          props.push('/dan');
        }}
        data-seed="logId1"
      >
      </TabBar.Item>
      <TabBar.Item
        icon={
          <div style={{
            width: '22px',
            height: '22px',
            background: 'url(http://116.62.136.201/wechat/icon/msg_0.svg) center center /  21px 21px no-repeat' }}
          />
        }
        selectedIcon={
          <div style={{
            width: '22px',
            height: '22px',
            background: 'url(http://116.62.136.201/wechat/icon/msg_1.svg) center center /  21px 21px no-repeat' }}
          />
        }
        title="消息"
        key="Msg"
        selected={selectedTab === 'Msg'}
        onPress={() => {
          selectedTab='Msg'
        }}
      >
        <div>3</div>
      </TabBar.Item>
      <TabBar.Item
        icon={{ uri: 'http://116.62.136.201/wechat/icon/user_0.svg' }}
        selectedIcon={{ uri: 'http://116.62.136.201/wechat/icon/user_1.svg' }}
        title="我的"
        key="User"
        selected={selectedTab === 'User'}
        onPress={() => {
          selectedTab='User'
        }}
      >
      </TabBar.Item>
    </TabBar>
  </div>
  )
}

// class Main extends Component {
//   constructor(props) {
//     super(props);
//     console.log('Main props:')
//     console.log(props);
//     allComments('https://www.easy-mock.com/mock/5c68f1f1160b1240c2965a90/api/allcomments')
//       .then((res)=>{
//         console.log(res)
//       })
//   }

//   //
  

//   render() {
//     let selectedTab='Home';
//     return (
//       // <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
     
//     );
//   }
// }

export default connect(null, { push })(Main);
