import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import Main from '../layouts/Main'
import Feedback from '../components/task/Feedback'
import Reserve from '../components/task/Reserve'
import NotFound from '../components/error/404'
import Status from '../components/common/Status'
import Search from '../components/common/Search'
import FbStation from '../components/task/FbStation'
import FbDetail from '../components/task/FbDetail'
import RsStation from '../components/task/RsStation'
import RsDetail from '../components/task/RsDetail'
import RsChart from '../components/chart/RsChart'
import PRsChart from '../components/chart/PRsChart'
import FbChart from '../components/chart/FbChart'
import Test from '../components/test'

export default class AppRouter extends Component {
    updateHandle() {
        console.log("换了一页")
    }
    render() {
        return (
            <div className='App'>
                <Switch>
                    <Route path="/" component={Main} exact />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/reserve" component={Reserve} />
                    <Route path='/result' component={Status} />
                    <Route path='/search' component={Search} />
                    <Route path="/fbstation" component={FbStation} />
                    <Route path="/fbdetail" component={FbDetail} />
                    <Route path="/rsstation" component={RsStation} />
                    <Route path="/rsdetail" component={RsDetail} />
                    <Route path="/rschart" component={RsChart} />
                    <Route path="/fbchart" component={FbChart} />
                    <Route path="/prschart" component={PRsChart} />
                    <Route path="/test" component={Test} />

                    <Route component={NotFound} />

                </Switch>
            </div>
        );
    }
}