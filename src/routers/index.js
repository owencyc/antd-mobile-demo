import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import Main from '../layouts/Main'
import Home from '../containers/HomeContainer'
import User from '../components/user/User'
import Task from '../components/task/Task'
import Feedback from '../components/task/Feedback'
import NotFound from '../components/error/404'
import Status from '../components/common/Status'
import App from '../App'

const NotFound1 = () => (
    <div style={{ position: "fixed", width: '100%', height: '100%', zIndex: "100" ,backgroundColor:'#f5f5f9'}}>404</div>
)
const dan = () => (
    <div>
        问题填单
    </div>
)

export default class AppRouter extends Component {
    updateHandle() {
        console.log("换了一页")
    }
    render() {
        return (
            <div className='App'>
                <div className='App_content'>
                    <Switch>
                        <Redirect exact from='/' to='/home' />
                        <Route path="/" component={App} exact />
                        <Route path="/home" component={Home} />
                        <Route path="/feedback" component={Feedback} />
                        <Route path="/user" component={User} />
                        <Route path="/task" component={Task} />
                        <Route path='/result'   component={Status} />
                        <Route component={NotFound} />

                    </Switch>
                </div>
                <Main></Main>
            </div>
        );
    }
}