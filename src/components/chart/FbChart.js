import React, { Component } from 'react'
import { List, Picker, WhiteSpace, Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { getFbChart } from '../../services'


class FbChart extends Component {

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
            line_data: [],
            bar_bugs: [],
            bar_nonbugs: [],
            bar_hours: [],
            select_month: '',
            pie_legend: [],
            pie_bug: [],
            pie_nonbug: [],
            bar_y_max: 100,
            sYear:[years[0].value],
            years:years
        };
    }

    getBarOption() {
        return {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                containLabel: true,
            },
            legend: {
                data: ['良率', '时数', 'bug数量']
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: this.state.bar_items
            }],
            yAxis: [{
                type: 'value',
                name: '良率',
                min: 60,
                max: 100,
                position: 'left',
                axisLabel: {
                    formatter: '{value}%'
                }
            }, {
                type: 'value',
                name: '时数',
                min: 0,
                position: 'right',
                axisLabel: {
                    formatter: '{value}H'
                }
            }, {
                type: 'value',
                name: '问题数量',
                offset: 60,
                min: 0,
                max: this.state.bar_y_max,
                position: 'right'
            }],
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
                name: '良率',
                type: 'line',
                stack: '良率',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: function (p) {
                            return p.value + '%';
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3,
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowBlur: 10,
                        shadowOffsetY: 10
                    }
                },
                data: this.state.line_data
            }, {
                name: '时数',
                type: 'bar',
                yAxisIndex: 1,
                stack: '时数',
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
                data: this.state.bar_hours
            },
            {
                name: 'bug数量',
                type: 'bar',
                yAxisIndex: 2,
                stack: '问题数',
                itemStyle: {
                    normal: {
                        color: "rgba(255,144,128,1)",
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                data: this.state.bar_bugs
            }
            ]
        }
    }
    
            // {
            //     name: '非bug数量',
            //     type: 'bar',
            //     yAxisIndex: 2,
            //     stack: '问题数',
            //     itemStyle: {
            //         normal: {
            //             color: "rgba(0,191,183,1)",
            //             barBorderRadius: 0,
            //             label: {
            //                 show: true,
            //                 position: "insideTop",
            //                 formatter: function (p) {
            //                     return p.value > 0 ? (p.value) : '';
            //                 }
            //             }
            //         }
            //     },
            //     data: this.state.bar_nonbugs
            // }

    getPieOption() {
        return {
            title: {
                text: this.state.select_month + '月度 bug单结案率'
            },
            legend: {
                top: '20',
                left: 'left',
                data: ['1天结案', '2天结案', '3天结案', '超3天结案']
            },
            series: [
                {
                    name: '结案',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '60%'],
                    label: {
                        formatter: '{c}件\n({d}%)'
                    },
                    data: this.state.pie_bug,
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

    getPieOption2() {
        return {
            title: {
                text: this.state.select_month + '月度 非bug单结案率'
            },
            legend: {
                top: '20',
                left: 'left',
                data: ['1天结案', '2天结案', '3天结案', '超3天结案']
            },
            series: [
                {
                    name: '结案',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '60%'],
                    label: {
                        formatter: '{c}件\n({d}%)'
                    },
                    data: this.state.pie_nonbug,
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
        getFbChart(year).then(res => {
            if (res.status === 0) {
                let items = [];
                let bug_values = [];
                let hours = [];
                let nonbug_values = [];
                let line_values = [];
                res.result.map((item) => {
                    items.push(item.month);
                    bug_values.push(item.bugs);
                    nonbug_values.push(item.nonbugs);
                    line_values.push(item.conformity_rate);
                    hours.push(item.hours);
                })
                let t = [...bug_values].sort((a, b) => b - a);
                console.log(t)
                this.setState({
                    data: res.result,
                    bar_items: items,
                    line_data: line_values,
                    bar_bugs: bug_values,
                    bar_nonbugs: nonbug_values,
                    bar_hours: hours,
                    bar_y_max: Math.ceil(t[0]+10)
                });

                if (this.state.data.length > 0) {
                    let tmp = this.state.data[0];
                    let p_bug = [
                        { name: '1天结案', value: tmp.bug_detail.in_one },
                        { name: '2天结案', value: tmp.bug_detail.in_two },
                        { name: '3天结案', value: tmp.bug_detail.in_three },
                        { name: '超3天结案', value: tmp.bug_detail.out_three }
                    ];
                    let p_nonbug = [
                        { name: '1天结案', value: tmp.nonbug_detail.in_one },
                        { name: '2天结案', value: tmp.nonbug_detail.in_two },
                        { name: '3天结案', value: tmp.nonbug_detail.in_three },
                        { name: '超3天结案', value: tmp.nonbug_detail.out_three }
                    ];
                    this.setState({
                        select_month: tmp.month,
                        pie_bug: p_bug,
                        pie_nonbug: p_nonbug
                    });
                }
            }
        })
    }



    componentDidMount() {
        this.getData(this.state.sYear[0]);
    }
    barClick(param, echarts) {
        console.log(param)
        // let items = [];
        // let values = [];
        // this.state.data[param.dataIndex].details.map((item) => {
        //     items.push(item.customer);
        //     values.push({ value: item.plan_hours, name: item.customer });
        // })
        // this.setState({
        //     select_month: this.state.data[param.dataIndex].month,
        //     pie_legend: items,
        //     pie_value: values
        // });
        let tmp = this.state.data[param.dataIndex];
        let p_bug = [
            { name: '1天结案', value: tmp.bug_detail.in_one },
            { name: '2天结案', value: tmp.bug_detail.in_two },
            { name: '3天结案', value: tmp.bug_detail.in_three },
            { name: '超3天结案', value: tmp.bug_detail.out_three }
        ];
        let p_nonbug = [
            { name: '1天结案', value: tmp.nonbug_detail.in_one },
            { name: '2天结案', value: tmp.nonbug_detail.in_two },
            { name: '3天结案', value: tmp.nonbug_detail.in_three },
            { name: '超3天结案', value: tmp.nonbug_detail.out_three }
        ];
        this.setState({
            select_month: tmp.month,
            pie_bug: p_bug,
            pie_nonbug: p_nonbug
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
                    style={{ width: this.state.size, height: this.state.size * 0.8 }} />
                <ReactEcharts
                    option={this.getPieOption2()}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"light"}
                    style={{ width: this.state.size, height: this.state.size * 0.8 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FbChart);