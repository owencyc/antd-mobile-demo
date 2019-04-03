import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import moment from 'moment'
import { push,goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import TitleLayout from '../../layouts/TitleLayout'
import { ListView,SwipeAction,Card,PullToRefresh,Toast,Modal } from 'antd-mobile'
import { getReserves,delReserve } from '../../services'
import { rsDetail } from '../../actions'

const alert = Modal.alert;

let pageIndex = 1;

class RsStation extends Component {
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
      pages:0,
      list:[]
    };
  }

  componentDidMount() {
    pageIndex = 1;
    Toast.loading('加载中', 0);
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    getReserves(pageIndex++).then((res)=>{
      Toast.hide();
      if(res.status===0){
        //console.log(moment(res.result.list[0].plan_complete_date).toDate())
        this.setState({
          list:res.result.list,
          dataSource: this.state.dataSource.cloneWithRows(res.result.list),
          refreshing: false,
          isLoading: false,
          pages:res.result.pages
        });
        
      }
    })
    
  }

  onRefresh = (tab) => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    pageIndex=1;
    getReserves(pageIndex++).then((res)=>{
      if(res.status===0){
        this.setState({
          list:res.result.list,
          dataSource: this.state.dataSource.cloneWithRows(res.result.list),
          refreshing: false,
          isLoading: false
        });
        
      }
    })
    
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if ( pageIndex>this.state.pages) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    getReserves(pageIndex++).then((res)=>{
      Toast.hide();
      if(res.status===0){
        let tmp=[...this.state.list,res.result.list];
        this.setState({
          list:tmp,
          dataSource: this.state.dataSource.cloneWithRows(tmp),
          refreshing: false,
          isLoading: false
        });
        
      }
    })
  }

  delData=(guid)=>{
    alert('警告', '确认删除该预估记录？', [
      { text: '否' },
      { text: '是', onPress: () => {
        delReserve(guid).then((res)=>{
          if(res.status===0){
            if(res.result.status){
              Toast.info('记录删除成功', 3, null, false);
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
    const row = (rowData, sectionID, rowID) => (
      <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: '删除',
              onPress: () => {this.delData(rowData.guid)},
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
        >
            <Card full  onClick={()=>{this.props.showDetail(rowData)}}>
              <Card.Header
                title={rowData.customer}
                thumb="http://221.226.187.245:8888/icon/form.svg"
                thumbStyle={{ width: '32px', height: '32px' }}
                extra={'工作量:'+rowData.plan_hours+'(H)'}
              />
              <Card.Body>
                <div>{"计划委托时间："+moment(rowData.plan_start_date).format('YYYY-MM-DD')+"~"+moment(rowData.plan_complete_date).format('YYYY-MM-DD')}</div>
              </Card.Body>
              <Card.Footer content={<div style={{textAlign:'left'}}></div>} extra={<div></div>} />
            </Card>
          </SwipeAction>
    );
    return(
      <TitleLayout content='时数预估记录' >
          <div className='fb-station'>
              <ListView
                  style={{ width: '100%', height: '100%' }}
                  key='0'
                  ref={el => this.lv = el}
                  dataSource={this.state.dataSource}
                  renderHeader={() => <span>（下拉刷新，左滑删除）</span>}
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
                  pageSize={10}
                  onEndReached={this.onEndReached}
                  onEndReachedThreshold={10}
              />
          </div>
      </TitleLayout>
      )
  }
}

const mapStateToProps = state => {
  return {
    list: state.reserve.list
  }
}
const mapDispatchToProps = dispatch => ({
  showDetail: (data)=>{ console.log(data);dispatch(rsDetail(data));dispatch(push('/rsdetail'));}
})

export default connect(mapStateToProps, mapDispatchToProps)(RsStation);