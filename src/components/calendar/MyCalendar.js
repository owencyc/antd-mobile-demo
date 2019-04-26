import React, { Component } from 'react'
import TitleLayout from '../../layouts/TitleLayout'
import { ListView, Card, Picker, Button, List, InputItem, TextareaItem, WhiteSpace, WingBlank, Calendar,Toast} from 'antd-mobile';
import { push, goBack } from 'connected-react-router'
import { createForm } from 'rc-form';
import { connect } from 'react-redux'
import { getJsConfig,getCalendar } from '../../services'
import moment from 'moment'
import { cdUpdate,cdSubmit } from '../../actions'
import { CSSTransition } from 'react-transition-group';
import district from '../../assets/district.json'
import './calendar.css'
import '../common/common.css'

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
            selectedDay: moment(curDate).format('YYYY-MM-DD'),
            showStation: true,
            add: false
        }

    }

    componentDidMount() {
        console.log(district);
        //获取行程数据
        this.getDataByDate(this.state.selectedDay);
        //微信认证
        let url = encodeURIComponent(window.location.href);
        getJsConfig(url).then((config) => {
            if (config.status === 0) {
                //wechat js 认证
                window.wx.config({
                    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.result.appId, // 必填，企业微信的corpID
                    timestamp: +config.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.result.nonceStr, // 必填，生成签名的随机串
                    signature: config.result.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
                    jsApiList: [] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
                });
            }
        })
    }

    getDataByDate(date){
        getCalendar(date).then(res=>{
            console.log(res);
            if(res.status===0){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(res.result)
                })
            }
        })
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
        this.getDataByDate(date);
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

    onConfirm = (startDateTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;

        if (startDateTime) {
            let mo = moment(startDateTime)
            this.props.updateData(this.state.name, mo.format('YYYY-MM-DD HH:mm:ss'));
        }
        this.setState({
            show: false,
            name: ''
        });
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false
        });
    }

    render() {
        const { getFieldProps } = this.props.form;

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
                <Card onClick={() => { console.log(rowData) }}>
                    <Card.Header
                        title={rowData.title}
                        thumbStyle={{ width: '32px', height: '32px' }}
                        extra={rowData.customer}
                    />
                    <Card.Body>
                        <div>{rowData.province+'-'+rowData.city+'-'+rowData.borough}</div>
                    </Card.Body>
                    <Card.Footer content={<div style={{ textAlign: 'left' }}>{rowData.begin_time}</div>} extra={<div>{rowData.end_time}</div>} />
                </Card>

            );
        };
        const addCalendar = () => {
            this.setState({
                add: true
            })
        }
        const chooseDest = () => {
            // window.wx.getLocation({
            //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //     success: function (res) {
            //         console.log(res);
            //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //         var speed = res.speed; // 速度，以米/每秒计
            //         var accuracy = res.accuracy; // 位置精度
            //         this.props.updateData('destination',res)
            //     }
            // });
        }

        return (
            <div style={{ height: '100%' }}>
                {this.state.showStation && (
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
                                <div className='add-panel' onClick={() => { addCalendar() }}>
                                    <img src='http://221.226.187.245:8888/icon/add.svg' style={{ width: '60px' }} alt='添加'></img>
                                </div>
                            </div>
                        </div>



                    </TitleLayout>
                )}
                <CSSTransition
                    in={this.state.add}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                    onEnter={() => { this.setState({ showStation: false }) }}
                    onExited={() => { this.setState({ showStation: true }) }}
                >
                    <div style={{ height: '100%' }} onClick={() => { }}>
                        <List renderHeader={() => '请填写' + this.state.selectedDay + '行程信息'}>
                            <InputItem
                                {...getFieldProps('creator', {
                                    initialValue: this.props.subData.creator
                                })}
                                editable={false}
                                placeholder=""
                            >填单人</InputItem>

                            <TextareaItem
                                title="行程摘要"
                                style={{ textAlign: 'right' }}
                                placeholder="请填写行程目的"
                                clear
                                data-seed="logId"
                                autoHeight
                                {...getFieldProps('title', {
                                    initialValue: this.props.subData.title,
                                    onChange: (e) => { this.props.updateData('title', e) }
                                })}
                            />

                            <InputItem
                                {...getFieldProps('customer', {
                                    initialValue: this.props.subData.customer,
                                    onChange: (e) => { this.props.updateData('customer', e) }
                                })}
                                clear
                                style={{ textAlign: 'right' }}
                                placeholder="请输入客户简称"
                            >客户简称</InputItem>

                            {/* <InputItem
                        {...getFieldProps('destination', {
                            initialValue: this.props.subData.destination
                        })}
                        style={{textAlign:'right'}}
                        onClick={()=>{ chooseDest() }}
                        placeholder="点击选择目的地"
                    >目的地</InputItem> */}

                            <Picker data={district} 
                                {...getFieldProps('destination', {
                                    initialValue: this.props.subData.destination,
                                    onChange: (e) => { this.props.updateData('destination', e) }
                                })}
                                title='请选择目的地'
                                className="forss">
                                <List.Item arrow="horizontal">目的地</List.Item>
                            </Picker>

                            <InputItem
                                {...getFieldProps('begin_time', {
                                    initialValue: this.props.subData.begin_time
                                })}
                                style={{ textAlign: 'right' }}
                                editable={false}
                                placeholder="请点击选择日期"
                                onClick={() => {
                                    let now = new Date();
                                    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                                    this.setState({
                                        show: true,
                                        name: 'begin_time',
                                        maxDate: new Date(now.getFullYear(), now.getMonth() + 2, 0, 0, 0, 0),
                                        chosenDate: this.props.subData.begin_time ? moment(this.props.subData.begin_time).toDate() : this.state.minDate
                                    });
                                }}
                            >开始时间</InputItem>
                            <InputItem
                                {...getFieldProps('end_time', {
                                    initialValue: this.props.subData.end_time
                                })}
                                style={{ textAlign: 'right' }}
                                editable={false}
                                placeholder="请点击选择日期"
                                onClick={() => {
                                    if (this.props.subData.end_time)
                                        console.log(moment(this.props.subData.end_time).toDate());
                                    let now = new Date();
                                    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                                    this.setState({
                                        show: true,
                                        name: 'end_time',
                                        minDate: this.props.subData.begin_time ? moment(this.props.subData.begin_time).toDate() : new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0),
                                        chosenDate: this.props.subData.end_time ? moment(this.props.subData.end_time).toDate() : this.state.minDate,
                                        maxDate: new Date(now.getFullYear() + 1, now.getMonth() + 2, 0, 0, 0, 0)
                                    });
                                }}
                            >结束时间</InputItem>
                            <Calendar
                                type='one'
                                enterDirection='horizontal'
                                pickTime={true}
                                visible={this.state.show}
                                onCancel={this.onCancel}
                                onConfirm={this.onConfirm}
                                defaultDate={this.state.chosenDate}
                                minDate={this.state.minDate}
                                maxDate={this.state.maxDate}
                            />


                            <TextareaItem
                                title="备注"
                                placeholder=""
                                clear
                                data-seed="logId"
                                autoHeight
                                {...getFieldProps('remark', {
                                    initialValue: this.props.subData.remark,
                                    onChange: (e) => { this.props.updateData('remark', e) }
                                })}
                            />
                            <WhiteSpace />

                            <WingBlank>
                                <Button type="primary" onClick={() => {
                                    let data=this.props.form.getFieldsValue();
                                    console.log(data);
                                    if(data.title && data.creator && data.customer && data.destination.length>0 && data.begin_time && data.end_time){
                                        this.props.submit({
                                            ...data,
                                            destination:data.destination[data.destination.length-1],
                                            creator:this.props.subData.creator_no
                                        })
                                        this.setState({ add: false })
                                    }else {
                                        Toast.info('请完善行程数据！', 3, null, false);
                                    }
                                    
                                }}>提交</Button>
                            </WingBlank>

                            <WhiteSpace />
                        </List>
                    </div>
                </CSSTransition>
            </div>


        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    //console.log(state);
    return state.calendar
}

const mapDispatchToProps = dispatch => ({
    updateData: (name, value) => { dispatch(cdUpdate(name, value)) },
    submit:(data)=>{dispatch(cdSubmit(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(MyCalendar));
//export default Status;