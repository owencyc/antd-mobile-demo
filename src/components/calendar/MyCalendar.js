import React, { Component } from 'react'
import TitleLayout from '../../layouts/TitleLayout'
import { ListView, Card, Toast, Button } from 'antd-mobile';
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import moment from 'moment'
import './calendar.css'

const monthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//判断闰年
const isLeap = (year) => {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    }
    else {
        return false;
    }
}
//判断某年某月某日是星期几
const whatDay = (year, month, day = 1) => {
    var sum = 0;
    sum += (year - 1) * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + day;
    for (var i = 0; i < month - 1; i++) {
        sum += monthDay[i];
    }
    if (month > 2) {
        if (isLeap(year)) {
            sum += 29;
        }
        else {
            sum += 28;
        }
    }
    return sum % 7;      //余数为0代表那天是周日，为1代表是周一，以此类推
}

const getDayOfWeek = (year, month, firstDay) => {
    var days;//从数组里取出该月的天数
    if (month == 2) {
        if (isLeap(year)) {
            days = 29;
        }
        else {
            days = 28;
        }
    }
    else {
        days = monthDay[month - 1];
    }

    /*添加日期部分*/
    let data = [];
    let row = [];
    for (let j = 0; j < firstDay; j++) {//对1号前空白格的填充
        row.push(0);
    }
    var changLine = firstDay;
    for (let i = 1; i <= days; i++) {//每一个日期的填充
        row.push(i);
        changLine = (changLine + 1) % 7;
        if (changLine == 0) {//是否换行填充的判断
            data.push(row);
            row = [];
        }
    }
    if (changLine !== 0) {//添加结束，对该行剩余位置的空白填充
        for (let k = changLine; k < 7; k++) {
            row.push(0);
        }
        data.push(row);
    }
    //console.log(data);
    return data;
}

const PadLeft = (num) => {
    return (Array(2).join('0') + num).slice(-2);
}

class MyCalendar extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        let curDate = new Date();
        let curYear = curDate.getFullYear();
        let curMonth = curDate.getMonth() + 1;

        this.state = {
            dataSource,
            year: curYear,
            month: curMonth,
            dayOfWeek: getDayOfWeek(curYear, curMonth, whatDay(curYear, curMonth)),
            selectedDay: moment(curDate).format('YYYY-MM-DD')
        }

    }

    componentDidMount() {
        // getFeedbacks(this.state.selectedTab).then((res) => {
        //     Toast.hide();
        //     if (res.status === 0) {
        //         this.setState({
        //             dataSource: this.state.dataSource.cloneWithRows(res.result.fbs)
        //         });

        //     }
        // })

        //showCld(curYear, curMonth, whatDay(curYear, curMonth));
    }

    getClass(day, key) {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1;
        var curDay = curDate.getDate();
        let cls = 'isDate '
        if (this.state.year === curYear && this.state.month === curMonth && day === curDay) {
            cls += 'curDate '
        }
        if (this.state.selectedDay === key) {
            cls += 'selDate';
        }
        return cls;
    }

    chooseDate(date) {
        this.setState({ selectedDay: date });
        //带出记录

    }

    preMonth() {
        let curDate = new Date();
        let curYear = this.state.year;
        let curMonth = this.state.month - 1;
        if (curMonth === 0) {
            curYear -= 1;
            curMonth = 12;
        }
        this.setState({
            year: curYear,
            month: curMonth,
            dayOfWeek: getDayOfWeek(curYear, curMonth, whatDay(curYear, curMonth))
        })
    }

    nextMonth() {
        let curDate = new Date();
        let curYear = this.state.year;
        let curMonth = this.state.month + 1;
        if (curMonth === 13) {
            curYear += 1;
            curMonth = 1;
        }
        this.setState({
            year: curYear,
            month: curMonth,
            dayOfWeek: getDayOfWeek(curYear, curMonth, whatDay(curYear, curMonth))
        })
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <Card full onClick={() => { this.props.showDetail(rowData) }}>
                    <Card.Header
                        title='head'
                        thumb="http://221.226.187.245:8888/icon/form.svg"
                        thumbStyle={{ width: '32px', height: '32px' }}
                        extra={rowData.customer}
                    />
                    <Card.Body>
                        <div>body</div>
                    </Card.Body>
                    <Card.Footer content={<div style={{ textAlign: 'left' }}>left</div>} extra={<div>right</div>} />
                </Card>

            );
        };
        return (
            <TitleLayout content='行事历设定'>
                <div style={{ width: '100%', height: '100%' }}>
                    <div id="cldFrame">
                        <div id="cldBody">
                            <table>
                                <thead>
                                    <tr>
                                        <td colSpan="7">
                                            <div id="top">
                                                <span id="left" onClick={() => { this.preMonth() }}>&lt;</span>
                                                <span id="topDate">{this.state.year}年{this.state.month}月</span>
                                                <span id="right" onClick={() => { this.nextMonth() }}>&gt;</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr id="week">
                                        <td>日</td>
                                        <td>一</td>
                                        <td>二</td>
                                        <td>三</td>
                                        <td>四</td>
                                        <td>五</td>
                                        <td>六</td>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                    {this.state.dayOfWeek.map((row, index) => (
                                        <tr key={this.state.year + '-' + PadLeft(this.state.month) + '-' + index}>
                                            {row.map((item, index) => {
                                                let prefix = this.state.year + '-' + PadLeft(this.state.month) + '-';
                                                if (item > 0) {
                                                    let key = prefix + PadLeft(item);
                                                    return (<td className={this.getClass(item, key)} onClick={() => { this.chooseDate(key) }} key={key}>{item}</td>)
                                                } else {
                                                    return (<td key={prefix + index}></td>)
                                                }
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='things'>
                        <ListView
                            style={{ width: '100%', height: 'calc(100% - 43.5px)' }}
                            key='0'
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}
                            renderHeader={() => <span>当日行程</span>}
                            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                我们是有底线的
                            </div>)}
                            renderRow={row}
                            renderSeparator={separator}
                            useBodyScroll={false}
                            pageSize={5}
                        />
                        <div className='add-panel' onClick={() => { console.log('add') }}>
                            <img src='http://221.226.187.245:8888/icon/add.svg' style={{ width: '60px' }} alt='添加'></img>
                        </div>
                    </div>
                </div>
            </TitleLayout>

        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    //console.log(state);
    return state.calendar
}

const mapDispatchToProps = dispatch => ({
    goOn: () => { dispatch(goBack()); },
    goList: (router) => {
        dispatch(push(router ? router : '/'));
    },
    goHome: () => { dispatch(push('/')); }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);
//export default Status;