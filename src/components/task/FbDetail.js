import React, { Component } from 'react'
import { push,goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import TitleLayout from '../../layouts/TitleLayout'
import { List } from 'antd-mobile'

const Item=List.Item;
const Brief=Item.Brief;

const getUrgent=(list,no)=>{
    let tmp=list.filter((item)=>{
        if(item.value===no)
            return item
    });
    let result='';
    if(tmp && tmp.length>0){
        result=tmp[0].label;
    }
    return result;
}
const FbDetail = (props) => (
    <TitleLayout content='问题单详情' >
        <List className="my-list">
            <Item extra={props.detail.confirm_no}>问题单号</Item>
            <Item extra={props.detail.customer}>客户简称</Item>
            <Item extra={props.detail.program_name}>程序名称</Item>
            <Item extra={props.detail.type}>问题类型</Item>
            <Item extra={getUrgent(props.urgentTypes,props.detail.urgent)}>紧急度</Item>
            <Item extra={props.detail.create_time}>提交日期</Item>
            <Item multipleLine={true} wrap={true}>
                问题描述
                <Brief style={{whiteSpace:'initial'}}>{props.detail.remark}</Brief>
            </Item>
            <Item extra={props.detail.pr_name}>目前处理人</Item>

        </List>
    </TitleLayout>
)

const mapStateToProps = state => {
  return {
    detail: state.feedback.detail,
    urgentTypes:state.feedback.urgentTypes
  }
}
const mapDispatchToProps = dispatch => ({
  back: () => { dispatch(goBack()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(FbDetail);