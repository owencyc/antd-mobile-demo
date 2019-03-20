import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import Main from '../layouts/Main'
import Feedback from '../components/task/Feedback'
import NotFound from '../components/error/404'
import Status from '../components/common/Status'
import Search from '../components/common/Search'
import App from '../App'

const NotFound1 = () => (
    <div style={{ position: "fixed", width: '100%', height: '100%', zIndex: "100", backgroundColor: '#f5f5f9' }}>404</div>
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
                <Switch>
                    <Route path="/" component={App} exact />
                    <Route path="/main" component={Main} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path='/result' component={Status} />
                    <Route path='/search' component={Search} />
                    <Route component={NotFound} />

                </Switch>
            </div>
        );
    }
}