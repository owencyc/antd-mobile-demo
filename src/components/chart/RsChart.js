import React, { Component } from 'react'
import { Picker, List, WhiteSpace, Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { getRsChart } from '../../services'


class RsChart extends Component {

    constructor(props) {
        super(props);
        let years=[];
        let nYear=(new Date()).getFullYear();
        for(let i=0;i<3;i++){
            years.push({
                value: nYear-i,
                label: nYear-i
            })
        }
        this.state = {
            size: document.body.clientWidth,
            data: [],
            bar_items: [],
            bar_value: [],
            select_month: '',
            pie_legend: [],
            pie_value: [],
            sYear:[years[0].value],
            years:years
        }
        console.log(this.state.size)
    }

    getBarOption() {
        return {
            grid: {
                left: '3%',
                right: '3%',
                top: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.bar_items,
                triggerEvent: true
            },
            yAxis: {
                type: 'value'
            },
            legend: {
                data:['预估时长','实际时长']
            },
            dataZoom: [{
                show: true,
                height: 30,
                xAxisIndex: [
                    0
                ],
                bottom: 30,
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                textStyle: {
                    color: "#000"
                },
                borderColor: "#90979c"
            }],
            series: [{
                name:'预估时长',
                type:'bar',
                data:this.state.bar_p_value,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (p) {
                                return p.value + 'H';
                            }
                        }
                    }
                },
            },
            {
                name:'实际时长',
                type:'bar',
                data:this.state.bar_a_value,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (p) {
                                return p.value + 'H';
                            }
                        }
                    }
                },
            }]
        }
    }

    getPieOption() {
        return {
            title: {
                text: this.state.select_month + '月度实际数据'
            },
            legend: {
                top: '20',
                left: 'left',
                data: this.state.pie_legend
            },
            series: [
                {
                    name: '时数',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '60%'],
                    label: {
                        formatter: '{c}H\n({d}%)'
                    },
                    data: this.state.pie_value,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    getData(year){
        getRsChart(year).then(res => {
            if (res.status === 0) {
                let items = [];
                let a_values = [];
                let p_values = [];
                res.result.map((item) => {
                    items.push(item.month);
                    a_values.push(item.actual_hours);
                    p_values.push(item.plan_hours);
                })
                this.setState({
                    data: res.result,
                    bar_items: items,
                    bar_p_value: p_values,
                    bar_a_value: a_values
                });

                let pitems = [];
                let pvalues = [];
                let sMonth='';
                if (this.state.data.length > 0) {
                    this.state.data[0].actual_details.map((item) => {
                        pitems.push(item.customer);
                        pvalues.push({ value: item.plan_hours, name: item.customer });
                    })
                    sMonth=this.state.data[0].month;
                }
                this.setState({
                    select_month: sMonth,
                    pie_legend: pitems,
                    pie_value: pvalues
                });
            }
        })
    }



    componentDidMount() {
        this.getData(this.state.sYear[0])
    }
    barClick(param, echarts) {
        console.log(param)
        console.log(echarts)
        let items = [];
        let values = [];
        this.state.data[param.dataIndex].actual_details.map((item) => {
            items.push(item.customer);
            values.push({ value: item.plan_hours, name: item.customer });
        })
        this.setState({
            select_month: this.state.data[param.dataIndex].month,
            pie_legend: items,
            pie_value: values
        });
    }
    render() {
        let onEvents = {
            'click': this.barClick.bind(this)
        }
        return (
            <TitleLayout content={this.props.location.state.title}>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker
                        data={this.state.years}
                        cols={1}
                        title="选择年份"
                        value={this.state.sYear}
                        onChange={v => this.setState({ sYear: v })}
                        onOk={v => { this.getData(v[0]) }}
                    >
                        <List.Item arrow="horizontal">年度</List.Item>
                    </Picker>
                </List>
                <ReactEcharts
                    option={this.getBarOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"light"}
                    onEvents={onEvents}
                    style={{ width: this.state.size, height: this.state.size }} />
                <ReactEcharts
                    option={this.getPieOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"light"}
                    style={{ width: this.state.size, height: this.state.size * 2 }} />
            </TitleLayout>
        )
    }
}

const mapStateToProps = state => {
    //console.log('main inject:');
    //console.log(state);
    return state.status
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RsChart);