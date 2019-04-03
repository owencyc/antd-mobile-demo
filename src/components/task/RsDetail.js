import React, { Component } from 'react'
import { push,goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import TitleLayout from '../../layouts/TitleLayout'
import { List } from 'antd-mobile'
import moment from 'moment'

const Item=List.Item;
const Brief=Item.Brief;

const getDateFormat=(date)=>{
    return moment(date).format('YYYY-MM-DD')
}

const RsDetail = (props) => (
    <TitleLayout content='时数预估详情' >
        <List className="my-list">
            <Item extra={props.detail.customer}>客户简称</Item>
            <Item extra={props.detail.plan_hours}>预估时数</Item>
            <Item extra={getDateFormat(props.detail.plan_start_date)}>预计委托日</Item>
            <Item extra={getDateFormat(props.detail.plan_complete_date)}>预计交付日</Item>
            <Item multipleLine={true} wrap={true}>
                备注
                <Brief style={{whiteSpace:'initial'}}>{props.detail.description}</Brief>
            </Item>

        </List>
    </TitleLayout>
)

const mapStateToProps = state => {
  return {
    detail: state.reserve.detail
  }
}
const mapDispatchToProps = dispatch => ({
  back: () => { dispatch(goBack()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(RsDetail);