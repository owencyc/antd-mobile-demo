import React, { Component } from 'react'
import { Result, Icon, WhiteSpace,Button } from 'antd-mobile';
import TitleLayout from '../../layouts/TitleLayout'
import { connect } from 'react-redux'
import echarts from 'echarts'


class RsChart extends Component {

    constructor(props) {
        super(props);
        this.state={
            size: document.body.clientWidth 
        }
        console.log(this.state.size)
    }

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('rscanvas'),'light');
        let pieChart = echarts.init(document.getElementById('rscanvas_pie'),'light');
        myChart.on('rendered', function () {
            pieChart.setOption({
                legend: {
                    left: 'left',
                    data: ['万卡信','福耀','上晋']
                },
                series : [
                    {
                        name: '时数',
                        type: 'pie',
                        radius : '70%',
                        center: ['50%', '60%'],
                        label: {
                            formatter: '{c}H({d}H)'
                        },
                        data:[
                            {value:100, name:'万卡信'},
                            {value:120, name:'福耀'},
                            {value:50, name:'上晋'}
                       
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        });
        // 绘制图表
        myChart.setOption({
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top:'6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['2019-04', '2019-05'],
                triggerEvent:true
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200],
                type: 'bar'
            }]
        });
        myChart.on('click', function (params) {
            console.log(params)
            pieChart.setOption({
                legend: {
                    left: 'left',
                    data: ['明芳','辉煌','上晋','杰立']
                },
                series : [
                    {
                        name: '时数',
                        type: 'pie',
                        radius : '70%',
                        center: ['50%', '60%'],
                        label: {
                            formatter: '{c}H({d}%)'
                        },
                        data:[
                            {value:100, name:'明芳'},
                            {value:120, name:'辉煌'},
                            {value:50, name:'上晋'},
                            {value:50, name:'杰立'}
                       
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        });
    }
    render() {
        return (
            <TitleLayout content={this.props.location.state.title}>
                <div id='rscanvas' style={{width:this.state.size,height:this.state.size}}></div>
                <div id='rscanvas_pie' style={{width:this.state.size,height:this.state.size*0.8}}></div>
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