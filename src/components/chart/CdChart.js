import React, { Component } from 'react'
import { Icon, List, DatePicker, Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import moment from 'moment'
import { getCalendarChart } from '../../services'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/lib/less/index.less';

class CdChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: document.body.clientWidth,
            height:document.body.clientHeight-50,
            date:moment().toDate(),
            minDate:moment().subtract(2,'years').month(1).toDate(),
            maxDate:moment().add(1,'months').toDate(),
            persons:['黄浩','陈泳澄','张杰','赵琪','陈冬阳','庄慧钧','何锴'],
            data:[
                {
                    date:'2019-05-05',
                    '黄浩':'深圳市',
                    '陈泳澄':'上海市,南京市'
                }
            ]
        }
        console.log(document.body)
    }
    getData(month){
        getCalendarChart(month).then(res => {
            if (res.status === 0) {
                console.log(res.result);
                let data=[]
                res.result.result.map(item=>{
                    let detail={...item.detail};
                    let tmp=Object.assign(detail,{
                        date:item.date,detail
                    })
                    data.push(tmp);
                })
                console.log(data)
                this.setState({
                    persons:res.result.persons,
                    data:data
                })
            }
        })
    }
    componentDidMount() {
        this.getData(moment(this.state.date).format('YYYY-MM'))
    }
    
    
    render() {
        
        return (
            <TitleLayout content='行事历统计'>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                <DatePicker
                        mode="month"
                        title="选择月份"
                        format='YYYY-MM'
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                        onOk={v => { this.getData(moment(v).format('YYYY-MM')) }}
                    >
                        <List.Item arrow="horizontal">月份</List.Item>
                    </DatePicker>
                </List>
                <Table data={this.state.data} width={this.state.width} height={this.state.height}
                    cellBordered wordWrap >
                    <Column width={100} sort fixed>
                        <HeaderCell>日期</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    {this.state.persons.map(item => (
                        <Column minWidth={60} flexGrow={1} key={item}>
                            <HeaderCell>{item}</HeaderCell>
                            <Cell>
                                {rowData => {
                                    return (
                                        <span>
                                            {rowData[item]?rowData[item]:''}
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