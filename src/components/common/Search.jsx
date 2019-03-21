import React, { Component } from 'react'
import { province } from 'antd-mobile-demo-data';

import { StickyContainer, Sticky } from 'react-sticky';
import { SearchBar, List, ListView, ActivityIndicator } from 'antd-mobile';
import { imageMap } from './syspara'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { getSearch } from '../../services'
import { fbUpdate} from '../../actions'

const { Item } = List;

function genData(ds, data) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  Object.keys(data).forEach((item, index) => {
    
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    data[item].forEach((jj) => {
      rowIDs[index].push(jj.value);
      dataBlob[jj.value] = jj.label;
    });
  });
  console.log(dataBlob)
  console.log(sectionIDs)
  console.log(rowIDs)
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}


function filterData(ds,data,val) {
  let tmp={};
  Object.keys(data).forEach((item, index) => {
    let detail=[];
    data[item].forEach((jj) => {
      if(jj.label.indexOf(val)!==-1 || jj.value.indexOf(val)!==-1){
        detail.push(jj);
      }
    });
    if(detail.length>0){
      tmp[item]=detail;
    }
  });
  return genData(ds,tmp);
}


class Search extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      bakData:[],
      inputValue: '',
      dataSource,
      isLoading: true,
    };
  }


  componentDidMount() {
    console.log('本次触发搜索：' + this.props.location.state.type);
    //this.autoFocusInst.focus();
    console.log(province)
    getSearch(this.props.location.state.type).then(res=>{
      this.setState({
        bakData:res.result,
        dataSource: genData(this.state.dataSource, res.result),
        isLoading: false,
      });
    });
    // setTimeout(() => {
    //   this.setState({
    //     dataSource: genData(this.state.dataSource, province),
    //     isLoading: false,
    //   });
    // }, 600);
  }

  render() {
    return (
      <div style={{width:'100%',height:'100%'}}>
        <SearchBar placeholder="查询"
          ref={ref => this.autoFocusInst = ref}
          onSubmit={(val) => { 
            console.log(this.state.bakData)
            
            this.setState({
              dataSource: filterData(this.state.dataSource, this.state.bakData,val),
            })  
          }}
          onCancel={() => { this.props.goBack() }} />
        <ListView.IndexedList
          useBodyScroll
          dataSource={this.state.dataSource}
          className="am-list sticky-list"
          renderSectionWrapper={sectionID => (
            <StickyContainer
              key={`s_${sectionID}_c`}
              className="sticky-container"
              style={{ zIndex: 4 }}
            />
          )}

          renderSectionHeader={sectionData => (
            <Sticky>
              {({
                style
              }) => (
                  <div
                    className="sticky"
                    style={{
                      ...style,
                      zIndex: 3,
                      backgroundColor: '#efeff4',
                      color: 'black'
                    }}
                  >{sectionData}</div>
                )}
            </Sticky>
          )}
          renderHeader={() => <span>客户列表</span>}
          renderFooter={() => <span>我们是有底线的</span>}
          renderRow={(rowData ,sectionID, rowID) => (<Item onClick={()=>{this.props.chooseItem(rowData,rowID)}}>{rowData}</Item>)}
          quickSearchBarStyle={{
            height:'80%',
            top: '10%',
            display:'flex',
            flexDirection:'column'
          }}
          delayTime={10}
          delayActivityIndicator={<ActivityIndicator toast text="正在加载" />}
        />

        
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(state);
  return state.search
}

const mapDispatchToProps = dispatch => ({
  chooseItem:(name,value)=>{ dispatch(fbUpdate('customer_no',value));dispatch(fbUpdate('customer',name));dispatch(goBack())},
  goBack: () => { dispatch(goBack()); },
  search: () => { dispatch(push('/main')); }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);