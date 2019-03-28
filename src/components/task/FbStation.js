import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh, Tabs, Toast, Card,SwipeAction,Modal ,Badge} from 'antd-mobile';
import PropTypes from 'prop-types'
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import {getFeedbacks,delFeedback } from '../../services'

import './task.css'
const alert = Modal.alert;
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
      selectdTab:0,
      tab0_count:0,
      tab1_count:0,
      tab2_count:0
    };
    this.state.tabs=[
      { title: '处理中', sub: '0' },
      { title: '待验证', sub: '1' },
      { title: '已结案', sub: '2' },
    ]
      
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
        switch(this.state.selectdTab){
          case 0:
            this.setState({
              tab0_count:res.result.length
            })
            break;
          case 1:
            this.setState({
              tab1_count:res.result.length
            })
            break;
          case 2:
            this.setState({
              tab2_count:res.result.length
            })
            break;
          default:
            break;
        }
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
        switch(this.state.selectdTab){
          case 0:
            this.setState({
              tab0_count:res.result.length
            })
            break;
          case 1:
            this.setState({
              tab1_count:res.result.length
            })
            break;
          case 2:
            this.setState({
              tab2_count:res.result.length
            })
            break;
          default:
            break;
        }
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
        txtStatus="待验证";
        txtClass="dot-1";
        break;
      case 2:
        txtStatus="已结案";
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

  delData=(no)=>{
    alert('警告', '确认删除问题单？', [
      { text: '否' },
      { text: '是', onPress: () => {
        delFeedback(no).then((res)=>{
          if(res.status===0){
            if(res.result.status){
              Toast.info('问题删除成功', 3, null, false);
              this.onRefresh();
              
            }
          }
          
        })
      }},
    ])
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
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: 'Delete',
              onPress: () => {this.delData(rowData.confirm_no)},
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
        >
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
          </SwipeAction>
        
      );
    };
    return (
      <TitleLayout content='问题清单'>
        <div className='fb-station'>
            <Tabs style={{height:'auto'}} tabs={this.state.tabs} initialPage={0} animated={false} useOnPan={false}
                onTabClick={(tab,index)=>{this.setState({selectdTab:index});console.log('tab change:'+index)}}
                renderTab={tab=><Badge text={this.state["tab"+tab.sub+"_count"]}>{tab.title}</Badge>}>
            </Tabs>
            <ListView
                style={{ width: '100%', height: 'calc(100% - 43.5px)' }}
                key='0'
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>（下拉刷新）</span>}
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

export default FbStation
