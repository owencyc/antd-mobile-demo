import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import AppRouter from './routers'
import Main from './layouts/Main'
import './App.css'
import { Router, Route, Switch, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { Modal ,Toast} from 'antd-mobile';
import { history } from './configureStore'
import {getToken,getUserinfo} from './services'
import {fbInit} from './actions'
const alert = Modal.alert;

class App extends Component {

  componentDidMount(){
    
    console.log('初始化数据');
    this.props.dispatch(fbInit());

    if(this.props.location.search){
      const searchParams = new URLSearchParams(this.props.location.search)
      console.log(searchParams.get('code'));
      if(searchParams.get('code')){
        localStorage.setItem("wc_user",searchParams.get('code')); 
        //在此component中完成所有数据的初始化，并重新dispatch各个store，本页面loading，加载完毕跳转到home
        
        //获取用户信息
        getUserinfo(searchParams.get('code')).then((user)=>{
          //需判断是否有错
          localStorage.setItem("user_info",JSON.stringify(user.result)); 
        })

        history.push('/home');
      }else{
        Toast.offline('获取微信认证失败！', 2);
      }
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

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapDispatchToProps)(App);
//export default App