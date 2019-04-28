import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router'
import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import 'react-animated-router/animate.css';
import Main from '../layouts/Main'
import Feedback from '../components/task/Feedback'
import Reserve from '../components/task/Reserve'
import NotFound from '../components/error/404'
import Status from '../components/common/Status'
import Search from '../components/common/Search'
import SearchAll from '../components/common/SearchAll'
import MyMap from '../components/common/MyMap'
import FbStation from '../components/task/FbStation'
import FbDetail from '../components/task/FbDetail'
import RsStation from '../components/task/RsStation'
import RsDetail from '../components/task/RsDetail'
import RsChart from '../components/chart/RsChart'
import PRsChart from '../components/chart/PRsChart'
import FbChart from '../components/chart/FbChart'
import MyCalendar from '../components/calendar/MyCalendar'
import Test from '../components/test'

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            console.log("安卓机！")
        }
        if (isIOS) {
            console.log("苹果果机！")
        }
        this.state={
            exit:isAndroid
        }
    }
    updateHandle() {
        console.log("换了一页")
    }
    render() {
        return (
            <div className='App'>
                <AnimatedRouter  className='App' exit={this.state.exit}>
                    <Route path="/" component={Main} exact />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/reserve" component={Reserve} />
                    <Route path='/result' component={Status} />
                    <Route path='/search' component={Search} />
                    <Route path='/searchall' component={SearchAll} />
                    <Route path="/fbstation" component={FbStation} />
                    <Route path="/fbdetail" component={FbDetail} />
                    <Route path="/rsstation" component={RsStation} />
                    <Route path="/rsdetail" component={RsDetail} />
                    <Route path="/rschart" component={RsChart} />
                    <Route path="/fbchart" component={FbChart} />
                    <Route path="/prschart" component={PRsChart} />
                    <Route path="/mycalendar" component={MyCalendar} />
                    <Route path="/map" component={MyMap} />
                    
                    <Route component={NotFound} />

                </AnimatedRouter>
            </div>
        );
    }
}