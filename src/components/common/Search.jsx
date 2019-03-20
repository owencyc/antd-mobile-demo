import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import { SearchBar, List, ListView, Button } from 'antd-mobile';
import { imageMap } from './syspara'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { menuEvent } from '../../actions'

const { Item } = List;

function genData(ds, provinceData) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  Object.keys(provinceData).forEach((item, index) => {
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    provinceData[item].forEach((jj) => {
      rowIDs[index].push(jj.value);
      dataBlob[jj.value] = jj.label;
    });
  });
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
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
      inputValue: '',
      dataSource,
      isLoading: true,
    };
  }


  componentDidMount() {
    console.log('本次触发搜索：' + this.props.location.state.type);
    this.autoFocusInst.focus();

    setTimeout(() => {
      this.setState({
        dataSource: genData(this.state.dataSource, []),
        isLoading: false,
      });
    }, 600);
  }

  render() {
    return (
      <div>
        <SearchBar placeholder="查询"
          ref={ref => this.autoFocusInst = ref}
          onSubmit={(val) => { }}
          onCancel={() => { this.props.goBack() }} />
        <ListView.IndexedList
          dataSource={this.state.dataSource}
          className="am-list sticky-list"
          useBodyScroll
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
                style,
              }) => (
                  <div
                    className="sticky"
                    style={{
                      ...style,
                      zIndex: 3,
                      backgroundColor: sectionData.charCodeAt(0) % 2 ? '#5890ff' : '#F8591A',
                      color: 'white',
                    }}
                  >{sectionData}</div>
                )}
            </Sticky>
          )}
          renderHeader={() => <span>custom header</span>}
          renderFooter={() => <span>custom footer</span>}
          renderRow={rowData => (<Item>{rowData}</Item>)}
          quickSearchBarStyle={{
            top: 85,
          }}
          delayTime={10}
          delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>rendering...</div>}
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
  goBack: () => { dispatch(goBack()); },
  search: () => { dispatch(push('/main')); }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);