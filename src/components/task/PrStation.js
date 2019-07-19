import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh, Tabs, Toast, Card, SwipeAction, Modal, List, Button, InputItem, Picker } from 'antd-mobile';
import PropTypes from 'prop-types'
import { createForm, formShape } from 'rc-form';
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { fbUpdateEnd } from '../../actions'
import { connect } from 'react-redux'
import { getFeedbacks, delFeedback, endFeedback } from '../../services'

import './task.css'
import { timeout } from 'q';
import { fbDetail } from '../../actions';

const alert = Modal.alert;
const prompt = Modal.prompt;

const data = [{
  confirm_no: 'IP0470000001',
  customer: '万卡信',
  type: '个案程序bug',
  remark: '我是问题描述',
  create_time: '2019/03/17',
  status: 2
}];


class PrStation extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    console.log(props)

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      selectedTab: 0,
      tab0_count: 0,
      tab1_count: 0,
      tab2_count: 0
    };
    this.state.tabs = [
      { title: '开发中', sub: '0' },
      { title: '已开发', sub: '1' },
      { title: '已测试', sub: '2' },
    ]

  }
  componentDidMount() {
    //判断是否有客户
    if(this.props.pr.subData.customer_no){
      console.log('有客户，触发刷新！')
    }
  }

  onRefresh = (tab) => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax

    getFeedbacks(tab ? tab : this.state.selectedTab).then((res) => {
      if (res.status === 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.result.fbs),
          refreshing: false,
          isLoading: false,
          tab0_count: res.result.counts.tab0_count,
          tab1_count: res.result.counts.tab1_count,
          tab2_count: res.result.counts.tab2_count
        });

      }
    })
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
    setTimeout(() => {
      this.onRefresh(index);
    })

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
      <Card full onClick={() => { this.props.showDetail(rowData) }}>
        <Card.Header
          title={rowData.confirm_no}
          extra={rowData.customer}
        />
        <Card.Body>
          <div>{rowData.type + "【" + rowData.remark + "】"}</div>
        </Card.Body>
        <Card.Footer content={'处理人：' + rowData.pr_name} extra={<div>{rowData.create_time}</div>} />
      </Card>
    );
    return (
      <TitleLayout content='个案追踪'>
        <div className='fb-station'>
          <InputItem
            {...getFieldProps('customer', {
              initialValue: this.props.pr.subData.customer
            })}
            editable={false}
            placeholder="请点击选择客户"
            onClick={() => { this.props.getCustomer() }}
          >客户简称</InputItem>
          <Tabs style={{ height: 'auto' }} tabs={this.state.tabs} initialPage={0} animated={false} useOnPan={false}
            onTabClick={this.changeTab}
            renderTab={tab => <span>{tab.title}{this.state["tab" + tab.sub + "_count"] > 0 ? ('(' + this.state["tab" + tab.sub + "_count"] + ')') : ''}</span>}>
          </Tabs>
          <ListView
            style={{ width: '100%', height: 'calc(100% - 43.5px)' }}
            key='0'
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderHeader={() => <div style={{ fontSize: '18px' }}><span style={{ color: 'red' }}>⚠</span>{this.state.selectedTab === 0 ? '（下拉刷新，左滑删除）' : (this.state.selectedTab === 1 ? '（下拉刷新，左滑结案）' : '（下拉刷新）')}</div>}
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
  updateData: (name, value) => { dispatch(fbUpdateEnd(name, value)) },
  showDetail: (data) => { console.log(data); dispatch(fbDetail(data)); dispatch(push('/fbdetail')); },
  getCustomer: () => { dispatch(push({ pathname: '/search', state: { type: 'customer', from: 'pr_c', title: '选择客户' } })) },

})
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(PrStation))
