import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import Home from '../components/home/Home'

import App from '../App'

const NotFound = () => (
    <div>404</div>
)

export default class AppRouter extends Component {
    updateHandle() {
        console.log("换了一页")
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Redirect exact from='/' to='/home' />
                        <Route path="/" component={App} exact />
                        <Route path="/home" component={Home} />

                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}