import React, { Component } from 'react'

import { StickyContainer, Sticky } from 'react-sticky';
import { SearchBar, List, ListView, ActivityIndicator,Toast } from 'antd-mobile';
import { imageMap } from './syspara'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { getSearch } from '../../services'
import { fbUpdate,rsUpdate } from '../../actions'

const { Item } = List;

function genData(ds, data) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  // Object.keys(data).forEach((item, index) => {
    
  //   sectionIDs.push(item);
  //   dataBlob[item] = item;
  //   rowIDs[index] = [];

  //   data[item].forEach((jj) => {
  //     rowIDs[index].push(jj.value);
  //     dataBlob[jj.value] = jj.label;
  //   });
  // });
  let index=0;
  for(let item in data){
    
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    // eslint-disable-next-line no-loop-func
    data[item].forEach((jj) => {
      rowIDs[index].push(jj.value);
      dataBlob[jj.value] = jj.label;
    });
    index++;
  }
  console.log(dataBlob)
  console.log(sectionIDs)
  console.log(rowIDs)
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}


function filterData(ds,data,val) {
  let tmp={};
  // Object.keys(data).forEach((item, index) => {
  //   let detail=[];
  //   data[item].forEach((jj) => {
  //     if(jj.label.indexOf(val)!==-1 || jj.value.indexOf(val)!==-1){
  //       detail.push(jj);
  //     }
  //   });
  //   if(detail.length>0){
  //     tmp[item]=detail;
  //   }
  // });
  for(let item in data){
    let detail=[];
    data[item].forEach((jj) => {
      if(jj.label.indexOf(val)!==-1 || jj.value.indexOf(val)!==-1){
        detail.push(jj);
      }
    });
    if(detail.length>0){
      tmp[item]=detail;
    }
  }
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
    Toast.loading('正在加载',0);
    getSearch(this.props.location.state.type,this.props.location.state.para).then(res=>{
      Toast.hide();
      //常用记录
      let usedCustmer=null;
      if(this.props.location.state.type==='customer'){
        let used=localStorage.getItem('used_customer');
        if(used){
          usedCustmer=JSON.parse(used);
        }
      }
      let tmp={...res.result}
      if(usedCustmer){
        tmp={'历史':usedCustmer,...res.result}
      }
      this.setState({
        bakData:tmp,
        dataSource: genData(this.state.dataSource, tmp),
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
          onChange={(val) => { 
            console.log(this.state.bakData)
            
            this.setState({
              dataSource: filterData(this.state.dataSource, this.state.bakData,val),
            })  
          }}
          showCancelButton
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
          renderHeader={() => <span>{this.props.location.state.title?this.props.location.state.title:'列表'}</span>}
          renderFooter={() => <span>我们是有底线的</span>}
          renderRow={(rowData ,sectionID, rowID) => 
            (<Item onClick={()=>{
              console.log(sectionID)
              this.props.chooseItem(this.props.location.state.type,this.props.location.state.from,rowData,rowID)
            }}>{rowData}
            </Item>)}
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
  chooseItem:(type,from,name,value)=>{ 
    if(type==='customer'){
      //保留3个历史记录
      let used=localStorage.getItem('used_customer');
      let usedCustmer=[];
      if(used){
        usedCustmer=JSON.parse(used);
        if(usedCustmer.length>2){
          usedCustmer.pop();
        }
        let tmp = usedCustmer.filter(item=>item.value===value);
        if(tmp.length===0){
          usedCustmer=[{value: value, label: name},...usedCustmer]
        }
      }else{
        usedCustmer.push({value: value, label: name});
      }
      localStorage.setItem('used_customer',JSON.stringify(usedCustmer))
    }
    switch(from){
      case 'fb_c':
        dispatch(fbUpdate('customer_no',value));
        dispatch(fbUpdate('customer',name));
        break;
      case 'rs':
        dispatch(rsUpdate('customer_no',value));
        dispatch(rsUpdate('customer',name));
        break;
      case 'fb_p':
        dispatch(fbUpdate('program_no',value));
        dispatch(fbUpdate('program',name));
        break;
      default:
        break;
    }
    dispatch(goBack())
  },
  goBack: () => { dispatch(goBack()); },
  search: () => { dispatch(push('/main')); }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);