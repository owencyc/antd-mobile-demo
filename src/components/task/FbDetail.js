import React, { Component } from 'react'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import TitleLayout from '../../layouts/TitleLayout'
import { List, Steps,WingBlank } from 'antd-mobile'
import { getFbDetail } from '../../services'

const Item = List.Item;
const Brief = Item.Brief;
const Step = Steps.Step;

const getUrgent = (list, no) => {
    let tmp = list.filter((item) => {
        if (item.value === no)
            return item
    });
    let result = '';
    if (tmp && tmp.length > 0) {
        result = tmp[0].label;
    }
    return result;
}

class FbDetail extends Component {

    constructor(props) {
        super(props);

        this.state={
            detail:[]
        }


    }

    componentDidMount() {
        if (this.props.detail) {
            getFbDetail(this.props.detail.confirm_no).then(res => {
                if(res.status===0){
                    this.setState({
                        detail:res.result
                    })
                    //console.log(res.result)
                }
            })
        }
    }

    render() {
        return (
            <TitleLayout content='问题单详情' >
                <List className="my-list">
                    <Item extra={this.props.detail.confirm_no}>问题单号</Item>
                    <Item extra={this.props.detail.customer}>客户简称</Item>
                    <Item extra={this.props.detail.program_name}>程序名称</Item>
                    <Item extra={this.props.detail.type}>问题类型</Item>
                    <Item extra={getUrgent(this.props.urgentTypes, this.props.detail.urgent)}>紧急度</Item>
                    <Item extra={this.props.detail.create_time}>提交日期</Item>
                    <Item multipleLine={true} wrap={true}>
                        问题描述
                <Brief style={{ whiteSpace: 'initial' }}>{this.props.detail.remark}</Brief>
                    </Item>
                    <Item extra={this.props.detail.pr_name}>目前处理人</Item>

                </List>
                <div className="sub-title">处理流程</div>
                <WingBlank size="lg">
                    
                    <Steps size="small" current={this.state.detail.length} style={{ 'textAlign': 'left' }}>
                        {this.state.detail.map(item=>(
                            <Step key={item.date+item.time} title={item.title} description={item.remark} />
                        ))}
                        
                    </Steps>
                </WingBlank>
                
            </TitleLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        detail: state.feedback.detail,
        urgentTypes: state.feedback.urgentTypes
    }
}
const mapDispatchToProps = dispatch => ({
    back: () => { dispatch(goBack()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(FbDetail);