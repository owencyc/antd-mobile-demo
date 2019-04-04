import React, { Component } from 'react'
import { Result, Icon, WhiteSpace, Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { getRsChart } from '../../services'


class RsChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: document.body.clientWidth,
            data: [],
            bar_items: [],
            bar_value: [],
            select_month: '',
            pie_legend: [],
            pie_value: []
        }
        console.log(this.state.size)
    }

    getBarOption() {
        return {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
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
            series: [{
                data: this.state.bar_value,
                type: 'bar'
            }]
        }
    }

    getPieOption() {
        return {
            title: {
                text: this.state.select_month + '月度数据'
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





    componentDidMount() {
        getRsChart().then(res => {
            if (res.status === 0) {
                let items = [];
                let values = [];
                res.result.map((item) => {
                    items.push(item.month);
                    values.push(item.hours);
                })
                this.setState({
                    data: res.result,
                    bar_items: items,
                    bar_value: values
                });

                let pitems = [];
                let pvalues = [];
                if (this.state.data.length > 0) {
                    this.state.data[0].details.map((item) => {
                        pitems.push(item.customer);
                        pvalues.push({ value: item.plan_hours, name: item.customer });
                    })
                    this.setState({
                        select_month: this.state.data[0].month,
                        pie_legend: pitems,
                        pie_value: pvalues
                    });
                }
            }
        })


    }
    barClick(param, echarts) {
        console.log(param)
        console.log(echarts)
        let items = [];
        let values = [];
        this.state.data[param.dataIndex].details.map((item) => {
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