import React, { Component } from 'react'
import { Result, Icon, WhiteSpace, Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { getFbChart } from '../../services'


class FbChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: document.body.clientWidth,
            data: [],
            bar_items: [],
            line_data:[],
            bar_bugs: [],
            bar_nonbugs: [],
            bar_hours:[],
            select_month: '',
            pie_legend: [],
            pie_bug: [],
            pie_nonbug:[],
            bar_y_max:100
        }
    }

    getBarOption() {
        return {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                containLabel: true,
            },
            legend: {
                data: ['良率','时数','bug数量','非bug数量']
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
            },{
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
                max:this.state.bar_y_max,
                position: 'right'
            }],
            series: [{
                name: '良率',
                type: 'line',
                stack: '良率',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: function(p) {
                                return p.value+'%';
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
            },{
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
                                formatter: function(p) {
                                    return p.value+'H';
                                }
                            }
                        }
                    },
                data: this.state.bar_hours
            },
            {
                name: '非bug数量',
                type: 'bar',
                yAxisIndex: 2,
                stack: '问题数',
                    itemStyle: {
                        normal: {
                            color: "rgba(0,191,183,1)",
                            barBorderRadius: 0,
                            label: {
                                show: true,
                                position: "insideTop",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                data: this.state.bar_nonbugs
            }, {
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
                                formatter: function(p) {
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

    getPieOption() {
        return {
            title: {
                text: this.state.select_month + '月度 bug单结案率'
            },
            legend: {
                top: '20',
                left: 'left',
                data:  ['1天结案','2天结案','3天结案','超3天结案']
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
                data: ['1天结案','2天结案','3天结案','超3天结案']
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





    componentDidMount() {
        getFbChart().then(res => {
            if (res.status === 0) {
                let items = [];
                let bug_values = [];
                let hours = [];
                let nonbug_values=[];
                let line_values=[];
                res.result.map((item) => {
                    items.push(item.month);
                    bug_values.push(item.bugs);
                    nonbug_values.push(item.nonbugs);
                    line_values.push(item.conformity_rate);
                    hours.push(item.hours);
                })
                let t=[...hours].sort((a,b)=>b-a);
                this.setState({
                    data: res.result,
                    bar_items: items,
                    line_data: line_values,
                    bar_bugs:bug_values,
                    bar_nonbugs:nonbug_values,
                    bar_hours:hours,
                    bar_y_max:Math.ceil(t[0]/100)
                });

                if (this.state.data.length > 0) {
                    let tmp=this.state.data[0];
                    let p_bug=[
                            {name:'1天结案',value:tmp.bug_detail.in_one},
                            {name:'2天结案',value:tmp.bug_detail.in_two},
                            {name:'3天结案',value:tmp.bug_detail.in_three},
                            {name:'超3天结案',value:tmp.bug_detail.out_three}
                        ];
                     let   p_nonbug=[
                            {name:'1天结案',value:tmp.nonbug_detail.in_one},
                            {name:'2天结案',value:tmp.nonbug_detail.in_two},
                            {name:'3天结案',value:tmp.nonbug_detail.in_three},
                            {name:'超3天结案',value:tmp.nonbug_detail.out_three}
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
        let tmp=this.state.data[param.dataIndex];
        let p_bug=[
            {name:'1天结案',value:tmp.bug_detail.in_one},
            {name:'2天结案',value:tmp.bug_detail.in_two},
            {name:'3天结案',value:tmp.bug_detail.in_three},
            {name:'超3天结案',value:tmp.bug_detail.out_three}
        ];
     let   p_nonbug=[
            {name:'1天结案',value:tmp.nonbug_detail.in_one},
            {name:'2天结案',value:tmp.nonbug_detail.in_two},
            {name:'3天结案',value:tmp.nonbug_detail.in_three},
            {name:'超3天结案',value:tmp.nonbug_detail.out_three}
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