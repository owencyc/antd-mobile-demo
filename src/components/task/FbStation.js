import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh, WingBlank, Toast, Card } from 'antd-mobile';
import PropTypes from 'prop-types'
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import {getFeedbacks} from '../../services'

import './task.css'

const data = [{
  confirm_no:'IP0470000001',
  customer:'万卡信',
  type:'个案程序bug',
  remark:'我是问题描述',
  create_time:'2019/03/17',
  status:2
}];

class FbStation extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    console.log(dataSource)

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
  }
  componentDidMount() {
    console.log('task=>componentDidMount');
    Toast.loading('Loading...', 0);
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    getFeedbacks().then((res)=>{
      Toast.hide();
      if(res.status===0){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.result),
          height: hei,
          refreshing: false,
          isLoading: false,
        });
      }
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    getFeedbacks().then((res)=>{
      if(res.status===0){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.result),
          refreshing: false,
          isLoading: false,
        });
      }
    })
  };

  getStatus=(status)=>{
    let txtStatus='处理中';
    let txtClass="dot-0";
    switch(status){
      case 0:
        txtStatus="处理中";
        txtClass="dot-0";
        break;
      case 1:
        txtStatus="已经完成";
        txtClass="dot-1";
        break;
      case 2:
        txtStatus="已经结案";
        txtClass="dot-2";
        break;
      default:
        break;
    }
    return( 
      <div className='task-status-panel'>
        <div className={txtClass}></div>
        {txtStatus}
      </div>
  )}


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
        <Card full>
          <Card.Header
            title={rowData.confirm_no}
            thumb="http://221.226.187.245:8888/icon/form.svg"
            thumbStyle={{ width: '32px', height: '32px' }}
            extra={this.getStatus(rowData.status)}
          />
          <Card.Body>
            <div>{rowData.type+"【"+rowData.remark+"】"}</div>
          </Card.Body>
          <Card.Footer content={rowData.customer} extra={<div>{rowData.create_time}</div>} />
        </Card>
      );
    };
    return (
      <TitleLayout content='问题清单'>
        <ListView
          style={{ width: '100%', height: '100%' }}
          key='0'
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => <span>问题单（下拉刷新）</span>}
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

      </TitleLayout>
    )
  }
}

export default FbStation
