import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { ListView, PullToRefresh, Tabs, Toast, Card, Modal, List, Button, InputItem, Calendar } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { prUpdate } from '../../actions'
import { connect } from 'react-redux'
import { getCases } from '../../services'

import './task.css'
import { fbDetail } from '../../actions';

const alert = Modal.alert;
const prompt = Modal.prompt;



class PrStation extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    console.log(props)
    let now = new Date();
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      selectedTab: 0,
      tab0_count: 0,
      tab1_count: 0,
      tab2_count: 0,
      name: '',
      show: false,
      defaultDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0),
      minDate: new Date(now.getFullYear() - 1, now.getMonth(), 1, 0, 0, 0),
      maxDate: new Date(),
      program_count:0,
      program_hours:0
    };
    this.state.tabs = [
      { title: '开发中', sub: '0' },
      { title: '已开发', sub: '1' },
      { title: '已测试', sub: '2' },
    ]

  }
  componentDidMount() {

    let now = new Date();
    if (!this.props.pr.subData.start_date) {

      //let mo = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0))
      //this.props.updateData('start_date', mo.format('YYYY-MM-DD'));
    }
    if (!this.props.pr.subData.end_date) {
      //let mo = moment(now)
      //this.props.updateData('end_date', mo.format('YYYY-MM-DD'));
    }
    //判断是否有客户
    if (this.props.pr.subData.customer_no) {
      //console.log('有客户，触发刷新！');
      getCases(this.props.pr.subData).then((res) => {
        if (res.status === 0) {
          //console.log(res.result);
          //合计信息
          let hours=0;
          res.result.cases.map(item=>{
            hours+=(+item.hours);
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(res.result.cases),
            refreshing: false,
            isLoading: false,
            tab0_count:res.result.counts.tab0_count,
            tab1_count:res.result.counts.tab1_count,
            tab2_count:res.result.counts.tab2_count,
            program_count:res.result.cases.length,
            program_hours:hours
          });
        }
      })
    }
  }


  onRefresh = () => {
    console.log('refresh...')
    this.setState({ refreshing: true, isLoading: true });

    // simulate initial Ajax
    if (this.props.pr.subData.customer_no) {
      getCases(this.props.pr.subData).then((res) => {
        if (res.status === 0) {
          //console.log(res.result);
          //合计信息
          let hours=0;
          res.result.cases.map(item=>{
            hours+=(+item.hours);
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(res.result.cases),
            refreshing: false,
            isLoading: false,
            tab0_count:res.result.counts.tab0_count,
            tab1_count:res.result.counts.tab1_count,
            tab2_count:res.result.counts.tab2_count,
            program_count:res.result.cases.length,
            program_hours:hours
          });
        }
      })
    }
  };

  getStatus = (status) => {
    let txtStatus = '开发中';
    let txtClass = "dot-0";
    switch (status) {
      case 0:
        txtStatus = "开发中";
        txtClass = "dot-0";
        break;
      case 1:
        txtStatus = "已开发";
        txtClass = "dot-1";
        break;
      case 2:
        txtStatus = "已测试";
        txtClass = "dot-2";
        break;
      default:
        break;
    }
    return (
      <div className='task-status-panel'>
        <div className={txtClass}></div>
        {txtStatus}
      </div>
    )
  }


  clickData = () => {

  }

  changeTab = (tab, index) => {
    this.setState({ selectedTab: index });
    this.props.updateData('type', index);
    setTimeout(() => {
      this.onRefresh();
    })

  }

  onConfirm = (startDateTime) => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;

    if (startDateTime) {
      let mo = moment(startDateTime)
      this.props.updateData(this.state.name, mo.format('YYYY-MM-DD'));
    }
    this.setState({
      show: false,
      name: ''
    });
    setTimeout(() => {
      this.onRefresh();
    })
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
    const row = (rowData, sectionID, rowID) => (
      <Card full onClick={() => { console.log(rowData) }}>
        <Card.Header
          title={rowData.confirm_no + '-' + rowData.confirm_seq}
          extra={rowData.customer_name}
        />
        <Card.Body>
          <div>{rowData.program_no + "【" + rowData.program_name + "】"}</div>
        </Card.Body>
        <Card.Footer content={'PR：' + rowData.pr_name} extra={<div>{this.state.selectedTab===0?('预完日：' + rowData.p_complete_date):('完成日：' + rowData.complete_date)}</div>} />
      </Card>
    );
    return (
      <TitleLayout content='个案追踪'>
        <div className='fb-station'>
          <InputItem
            {...getFieldProps('customer', {
              initialValue: this.props.pr.subData.customer
            })}
            style={{ textAlign: 'right' }}
            editable={false}
            placeholder="请点击选择客户"
            onClick={() => { this.props.getCustomer() }}
          >客户简称</InputItem>
          <InputItem
            {...getFieldProps('start_date', {
              initialValue: this.props.pr.subData.start_date
            })}
            style={{ textAlign: 'right' }}
            editable={false}
            placeholder="请点击选择日期"
            onClick={() => {
              let now = new Date();
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
                name: 'start_date',
                maxDate: this.props.pr.subData.end_date ? moment(this.props.pr.subData.end_date).toDate() : new Date(),
                defaultDate: this.props.pr.subData.start_date ? moment(this.props.pr.subData.start_date).toDate() : this.state.defaultDate
              });
            }}
          >开始日期</InputItem>
          <InputItem
            {...getFieldProps('end_date', {
              initialValue: this.props.pr.subData.end_date
            })}
            style={{ textAlign: 'right' }}
            editable={false}
            placeholder="请点击选择日期"
            onClick={() => {
              if (this.props.pr.subData.end_date)
                console.log(moment(this.props.pr.subData.end_date).toDate());
              let now = new Date();
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
                name: 'end_date',
                minDate: this.props.pr.subData.start_date ? moment(this.props.pr.subData.start_date).toDate() : new Date(now.getFullYear(), now.getMonth() -3, 1, 0, 0, 0),
                defaultDate: this.props.pr.subData.end_date ? moment(this.props.pr.subData.end_date).toDate() : this.state.defaultDate,
                maxDate: new Date()
              });
            }}
          >结束日期</InputItem>
          <Calendar
            type='one'
            visible={this.state.show}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            defaultDate={this.state.defaultDate}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
          />
          <Tabs style={{ height: 'auto' }} tabs={this.state.tabs} initialPage={0} animated={false} useOnPan={false}
            onTabClick={this.changeTab}
            renderTab={tab => <span>{tab.title}{this.state["tab" + tab.sub + "_count"] > 0 ? ('(' + this.state["tab" + tab.sub + "_count"] + ')') : ''}</span>}>
          </Tabs>
          <ListView
            style={{ width: '100%', height: 'calc(100% - 222px)' }}
            key='0'
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              我们是有底线的
                </div>)}
            renderRow={row}
            renderSeparator={separator}
            useBodyScroll={false}
            pullToRefresh={<PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
            pageSize={5}
          />
          <div style={{ width: '100%', height: '40px' ,backgroundColor:'#fff',fontSize:'30px',textAlign:'right'}}>
              合计{this.state.program_count}支程序，共{this.state.program_hours}H
          </div>
        </div>

      </TitleLayout>
    )
  }
}
const mapStateToProps = state => {
  console.log(state)
  return { pr: state.pr, user: state.user.info }
}
const mapDispatchToProps = dispatch => ({
  updateData: (name, value) => { dispatch(prUpdate(name, value)) },
  showDetail: (data) => { console.log(data); dispatch(fbDetail(data)); dispatch(push('/fbdetail')); },
  getCustomer: () => { dispatch(push({ pathname: '/search', state: { type: 'customer', from: 'pr_c', title: '选择客户' } })) },

})
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(PrStation))
