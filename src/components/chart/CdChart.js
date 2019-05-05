import React, { Component } from 'react'
import { Icon, List, WhiteSpace, Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import moment from 'moment'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/lib/less/index.less';

class CdChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: document.body.clientWidth,
            height:document.body.clientHeight-50,
            persons:['黄浩','陈泳澄','张杰','赵琪','陈冬阳','庄慧钧','何锴'],
            data:[
                {
                    date:'2019-05-05',
                    '黄浩':'guid',
                    '陈泳澄':'guid'
                },
                {
                    date:'2019-05-06',
                    '张杰':'jack',
                    '赵琪':'test'
                },{
                    date:'2019-05-07',
                    '黄浩':'guid',
                    '陈泳澄':'guid',
                    '庄慧钧':'guid',
                    '陈冬阳':'guid'
                },
                {
                    date:'2019-05-08',
                    '张杰':'jack',
                    '赵琪':'test',
                    '庄慧钧':'guid',
                    '何锴':'guid'
                },{
                    date:'2019-05-09',
                    '黄浩':'guid',
                    '陈泳澄':'guid',
                    '赵琪':'test',
                    '庄慧钧':'guid',
                    '何锴':'guid'
                },
                {
                    date:'2019-05-10',
                    '张杰':'jack',
                    '赵琪':'test',
                    '黄浩':'test',
                    '庄慧钧':'guid',
                    '何锴':'guid'
                },{
                    date:'2019-05-11',
                    '黄浩':'guid',
                    '陈泳澄':'guid'
                },
                {
                    date:'2019-05-12',
                    '张杰':'jack',
                    '赵琪':'test'
                }
            ]
        }
        console.log(document.body)
    }

    componentDidMount() {
        //
        
    }
    
    
    render() {
        
        return (
            <TitleLayout content='行事历统计'>
                <Table data={this.state.data} width={this.state.width} height={this.state.height} >
                    <Column width={100} sort fixed>
                        <HeaderCell>日期</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    {this.state.persons.map(item => (
                        <Column minWidth={50} flexGrow={1} key={item}>
                            <HeaderCell>{item}</HeaderCell>
                            <Cell>
                                {rowData => {
                                    return (
                                        <span>
                                            {rowData[item]?(<Icon type="check" />):''}
                                        </span>
                                    );
                                }}
                            </Cell>
                        </Column>
                    ))}
                    
                </Table>
            </TitleLayout>
        )
    }
}

const mapStateToProps = state => {
    return state.status
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CdChart);