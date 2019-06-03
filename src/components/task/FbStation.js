import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh, Tabs, Toast, Card,SwipeAction,Modal ,List,Button,TextareaItem,Picker} from 'antd-mobile';
import PropTypes from 'prop-types'
import { createForm, formShape } from 'rc-form';
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { fbUpdateEnd} from '../../actions'
import { connect } from 'react-redux'
import {getFeedbacks,delFeedback,endFeedback } from '../../services'

import './task.css'
import { timeout } from 'q';
import { fbDetail } from '../../actions';

const alert = Modal.alert;
const prompt = Modal.prompt;

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
    console.log(props)

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      selectedTab:0,
      tab0_count:0,
      tab1_count:0,
      tab2_count:0,
      end_modal:false
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

    getFeedbacks(this.state.selectedTab).then((res)=>{
      Toast.hide();
      if(res.status===0){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.result.fbs),
          height: hei,
          refreshing: false,
          isLoading: false,
          tab0_count:res.result.counts.tab0_count,
          tab1_count:res.result.counts.tab1_count,
          tab2_count:res.result.counts.tab2_count
        });
        
      }
    })
  }

  onRefresh = (tab) => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    
    getFeedbacks(tab?tab:this.state.selectedTab).then((res)=>{
      if(res.status===0){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.result.fbs),
          refreshing: false,
          isLoading: false,
          tab0_count:res.result.counts.tab0_count,
          tab1_count:res.result.counts.tab1_count,
          tab2_count:res.result.counts.tab2_count
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

  endData=(data)=>{
    // prompt('提醒', '确认将此问题单结案？并填写结案说明', [
    //   { text: '否' },
    //   { text: '是', onPress: value => {
    //     endFeedback(no,value,this.props.user.dept_no).then((res)=>{
    //       if(res.status===0){
    //         if(res.result.status){
    //           Toast.info('问题单结案成功', 3, null, false);
    //           this.onRefresh();
    //         }
    //       }else{
    //         Toast.info(res.exception, 3, null, false);
    //       }
    //     })
    //   } },
    // ])
    this.setState({
      end_modal:true
    })
    this.props.updateData('no', data.confirm_no)
    this.props.updateData('type', [data.type_no])
  }

  clickData=()=>{
    
  }

  changeTab=(tab,index)=>{
    this.setState({selectedTab:index});
    setTimeout(()=>{
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
    const row = (rowData, sectionID, rowID) => {
      if(this.state.selectedTab===0){
      return (
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: '删除',
              onPress: () => {this.delData(rowData.confirm_no)},
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
        >
            <Card full onClick={()=>{this.props.showDetail(rowData)}}>
              <Card.Header
                title={rowData.confirm_no}
                extra={rowData.customer}
              />
              <Card.Body>
                <div>{rowData.type+"【"+rowData.program_name+"】"}</div>
              </Card.Body>
              <Card.Footer content={<div style={{textAlign:'left'}}>处理人:{rowData.pr_name}<br/>已耗时:{rowData.days_used}(天)</div>} extra={<div>{rowData.create_time}</div>} />
            </Card>
          </SwipeAction>
        
      );
        }else if(this.state.selectedTab===1){
          return (
            <SwipeAction
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '结案',
                  onPress: () => {this.endData(rowData)},
                  style: { backgroundColor: '#61BDFF', color: 'white' },
                },
              ]}
            >
                <Card full onClick={()=>{this.props.showDetail(rowData)}}>
                  <Card.Header
                    title={rowData.confirm_no}
                    extra={rowData.customer}
                  />
                  <Card.Body>
                    <div>{rowData.type+"【"+rowData.program_name+"】"}</div>
                  </Card.Body>
                  <Card.Footer content={<div style={{textAlign:'left'}}>处理人:{rowData.pr_name}<br/>已耗时:{rowData.days_used}(天)</div>} extra={<div>{rowData.create_time}</div>} />
                </Card>
              </SwipeAction>
            
          );
            }else{
          return(
            <Card full onClick={()=>{this.props.showDetail(rowData)}}>
              <Card.Header
                title={rowData.confirm_no}
                extra={rowData.customer}
              />
              <Card.Body>
                <div>{rowData.type+"【"+rowData.remark+"】"}</div>
              </Card.Body>
              <Card.Footer content={'处理人：'+rowData.pr_name} extra={<div>{rowData.create_time}</div>} />
            </Card>
          )
        }
    };
    return (
      <TitleLayout content='问题清单'>
        <div className='fb-station'>
            <Tabs style={{height:'auto'}} tabs={this.state.tabs} initialPage={0} animated={false} useOnPan={false}
                onTabClick={this.changeTab}
                renderTab={tab=><span>{tab.title}{this.state["tab"+tab.sub+"_count"]>0?('('+this.state["tab"+tab.sub+"_count"]+')'):''}</span>}>
            </Tabs>
            <ListView
                style={{ width: '100%', height: 'calc(100% - 43.5px)' }}
                key='0'
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <div style={{fontSize:'18px'}}><span style={{color:'red'}}>⚠</span>{this.state.selectedTab===0?'（下拉刷新，左滑删除）':(this.state.selectedTab===1?'（下拉刷新，左滑结案）':'（下拉刷新）')}</div>}
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

        <Modal
          popup
          closable={true}
          visible={this.state.end_modal}
          onClose={()=>{this.setState({end_modal:false})}}
          animationType="slide-up"
          afterClose={() => { console.log('afterClose'); }}
        >
          <List renderHeader={() => <div>问题单结案（问题类型请慎重变更！）</div>} className="popup-list">
          <List.Item >问题单号：{this.props.feedback.endData.no}</List.Item>
            <Picker data={this.props.feedback.bugTypes} cols={1} 
                    {...getFieldProps('type',{
                        initialValue: this.props.feedback.endData.type,
                        onChange:(e)=>{this.props.updateData('type',e)}
                      })} 
                    title='请选择问题类型'
                    className="forss">
                    <List.Item arrow="horizontal">问题类型</List.Item>
                </Picker>
                <TextareaItem
                    title="结案说明"
                    placeholder="请填写结案说明"
                    clear
                    data-seed="logId"
                    autoHeight
                    {...getFieldProps('description',{
                        initialValue: this.props.feedback.endData.description,
                        onChange:(e)=>{this.props.updateData('description',e)}
                      })}
                />
            <List.Item>
              <Button type="primary" onClick={() => {
                let info={
                  confirm_no:this.props.feedback.endData.no,
                  type_no:this.props.feedback.endData.type[0],
                  end_remark:this.props.feedback.endData.description,
                  dept_no:this.props.user.dept_no
                }
                console.log(info)
                endFeedback(info).then((res) => {
                  if (res.status === 0) {
                    if (res.result.status) {
                      Toast.info('问题单结案成功', 3, null, false);
                      this.setState({end_modal:false})
                      this.onRefresh();
                    }
                  } else {
                    Toast.info(res.exception, 3, null, false);
                  }
                })
              }}>结案</Button>
            </List.Item>
          </List>
        </Modal>
        
        

      </TitleLayout>
    )
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {feedback:state.feedback,user:state.user.info}
}
const mapDispatchToProps = dispatch => ({
  updateData:(name,value)=>{dispatch(fbUpdateEnd(name,value))},
  showDetail: (data)=>{ console.log(data);dispatch(fbDetail(data));dispatch(push('/fbdetail'));}
})
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(FbStation))
