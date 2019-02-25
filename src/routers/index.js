import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import Main from '../layouts/Main'

import App from '../App'

const NotFound = () => (
    <div>404</div>
)
const dan=()=>(
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
            <div>
                <Switch>
                    <Redirect exact from='/' to='/home' />
                    <Route path="/" component={App} exact />
                    <Route path="/home" component={Main} />
                    <Route path="/dan" component={dan} />

                    <Route component={NotFound} />
                </Switch>
            </div>

        );
    }
}