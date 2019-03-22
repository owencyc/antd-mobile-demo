import React, { Component } from 'react';
import moment from 'moment'
import { List, InputItem, TextareaItem, DatePicker, Button, WingBlank, WhiteSpace, Calendar, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import PropTypes from 'prop-types'
import {  rsUpdate } from '../../actions'
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import './feedback.css'



class Reserve extends Component {
    constructor(props) {
        console.log('rs render')
        console.log(props)
        super(props);

        let now=new Date();
        this.state={
            show: false,
            minDate:new Date(now.getFullYear(),now.getMonth()+1,1,0,0,0)
        }
        console.log(this.state)


    }
    componentDidMount() {
        console.log('rs=>componentDidMount');
        let tmp = localStorage.getItem("user_info");
        this.props.updateData('creator',tmp?JSON.parse(tmp).user_name:'');
        this.props.updateData('creator_code',tmp?JSON.parse(tmp).user_code:'');
    }

    onConfirm = (startDateTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        
        if(startDateTime){
            let mo=moment(startDateTime)
            this.props.updateData(this.state.name,mo.format('YYYY-MM-DD'));
        }
        this.setState({
            show: false,
            name:''
          });
      }
    
      onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
          show: false
        });
      }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <TitleLayout content='时数预估'>
                <List renderHeader={() => '请填写相关信息'}>
                    <InputItem
                        {...getFieldProps('creator', {
                            initialValue: this.props.subData.creator
                        })}
                        editable={false}
                        placeholder=""
                    >反映人</InputItem>


                    <InputItem
                        {...getFieldProps('customer', {
                            initialValue: this.props.subData.customer
                        })}
                        editable={false}
                        placeholder="请点击选择客户"
                        onClick={() => { this.props.getCustomer() }}
                        ref={el => this.txtCustomer = el}
                    >客户简称</InputItem>

                    <InputItem
                        {...getFieldProps('plan_hours', {
                            initialValue: this.props.subData.plan_hours
                        })}
                        type='number'
                        placeholder=""
                    >预估时数</InputItem>

                    {/* <DatePicker
                        {...getFieldProps('plan_start_date', {
                            initialValue: this.props.subData.plan_start_date,
                            rules: [
                              { required: true, message: 'Must select a date' }
                            ],
                          })}
                        mode="date"
                        title="请选择预计开始日期"
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                    >
                        <List.Item arrow="horizontal">预计委托日</List.Item>
                    </DatePicker> */}

                    {/* <DatePicker
                        {...getFieldProps('plan_complete_date', {
                            initialValue: this.props.subData.plan_complete_date,
                            rules: [
                              { required: true, message: 'Must select a date' }
                            ],
                          })}
                        mode="date"
                        title="请选择预计交付日期"
                        minDate={this.state.minDate}
                    >
                        <List.Item arrow="horizontal">预计交付日</List.Item>
                    </DatePicker> */}
                    <InputItem
                        {...getFieldProps('plan_start_date', {
                            initialValue: this.props.subData.plan_start_date
                        })}
                        style={{textAlign:'right'}}
                        editable={false}
                        placeholder="请点击选择日期"
                        onClick={() => { 
                            let now=new Date();
                            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                            this.setState({
                                show: true,
                                name:'plan_start_date',
                                maxDate:new Date(now.getFullYear(),now.getMonth()+2,0,0,0,0),
                                chosenDate:this.props.subData.plan_start_date?moment(this.props.subData.plan_start_date).toDate():this.state.minDate
                            });
                         }}
                    >预计委托日</InputItem>
                    <InputItem
                        {...getFieldProps('plan_complete_date', {
                            initialValue: this.props.subData.plan_complete_date
                        })}
                        style={{textAlign:'right'}}
                        editable={false}
                        placeholder="请点击选择日期"
                        onClick={() => { 
                            if(this.props.subData.plan_complete_date)
                            console.log(moment(this.props.subData.plan_complete_date).toDate());
                            let now=new Date();
                            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                            this.setState({
                                show: true,
                                name:'plan_complete_date',
                                minDate:this.props.subData.plan_start_date?moment(this.props.subData.plan_start_date).toDate():new Date(now.getFullYear(),now.getMonth()+1,1,0,0,0),
                                chosenDate:this.props.subData.plan_complete_date?moment(this.props.subData.plan_complete_date).toDate():this.state.minDate,
                                maxDate:undefined
                            });
                         }}
                    >预计交付日</InputItem>
                    <Calendar
                        type='one'
                        visible={this.state.show}
                        onCancel={this.onCancel}
                        onConfirm={this.onConfirm}
                        defaultDate={this.state.chosenDate}
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                    />


                    <TextareaItem
                        title="备注"
                        placeholder="请描述相关需求要点"
                        clear
                        data-seed="logId"
                        autoHeight
                        {...getFieldProps('description', {
                            initialValue: this.props.subData.description,
                            onChange: (e) => { this.props.updateData('description', e) }
                        })}
                    />
                    <WhiteSpace />

                    <WingBlank>
                        <Button type="primary" onClick={() => {
                            let data=this.props.form.getFieldsValue();
                            console.log(data);
                            if (data.creator && data.customer && data.plan_hours && data.plan_start_date && data.plan_complete_date && data.description){
                            
                            }else{
                                Toast.info('请完善表单数据！', 3, null, false);
                            }
                        }}>提交</Button>
                    </WingBlank>

                    <WhiteSpace />
                </List>

            </TitleLayout>
        )
    }
}


//container
const mapStateToProps = state => {
    return state.reserve
}

const mapDispatchToProps = dispatch => ({
    updateData:(name,value)=>{dispatch(rsUpdate(name,value))},
    getCustomer:()=>{dispatch(push({ pathname: '/search', state: { type: 'customer',from:'rs' } }))},
    push, dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Reserve));
