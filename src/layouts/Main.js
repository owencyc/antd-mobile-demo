import React, { Component } from 'react';
import { TabBar,Icon } from 'antd-mobile';
import {allComments} from '../services'
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../containers/HomeContainer'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import {menuEvent} from '../actions'


const Main=(props)=>{
  //console.log(props);

  return (
    <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>

    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      noRenderContent={true}
    >
      {props.menus.map(item => (
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
          selected={props.selectedTab === item.key}
          onPress={(item ,index)=> {
            console.log('选择tab：'+item.title);
            //console.log(index);
            // selectedTab='Home';
            // props.push('/home');
            let obj=props.menus[index];
            props.changeRoute(obj.router,index);
            //切换路由
          }}
          data-seed="logId"
        >
        </TabBar.Item>
      ))}
      
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

const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(state);
  return {
    selectedTab:state.main.selectedTab,
    menus:state.main.menus
  }
}
  
  const mapDispatchToProps = dispatch => ({
    changeRoute: (router ,index)=>{ dispatch(menuEvent(router,index));dispatch(push(router))},
    push
  })

export default connect(mapStateToProps, mapDispatchToProps)(Main);
