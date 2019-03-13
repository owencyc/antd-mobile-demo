import React,{Component} from 'react';
import { List, InputItem, TextareaItem, ImagePicker, Button, WingBlank, WhiteSpace, Picker,Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import PropTypes from 'prop-types'
import { fbImgEvent,fbSubmit,fbInit } from '../../actions'
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import './feedback.css'



class Feedback extends Component  {
    constructor(props){
        console.log('fb render')
        console.log(props)
        super(props);

        let tmp = localStorage.getItem("user_info");
        this.state = { // define this.state in constructor
            creator: tmp?JSON.parse(tmp).user_name:''
        } 
    }
    componentDidMount(){
        console.log('fb=>componentDidMount');
        this.props.dispatch(fbInit(["1","2"]))
    }
    
    
    //let txtCreator,txtCustomer,txtProgram,txtType,txtDescription;
    // let tmp = localStorage.getItem("user_info");
    // console.log(tmp);
    // let creator='';
    // if(tmp){
    //     creator=JSON.parse(tmp).user_name;
    // }
    render(){
        const { getFieldProps } = this.props.form;
    return (
        <TitleLayout content='问题单反馈'>
            <List renderHeader={() => '请填写相关信息'}>
                <InputItem
                    {...getFieldProps('autofocus',{
                        initialValue: this.state.creator,
                      })}
                      editable={false}
                    placeholder=""
                    ref={el => this.txtCreator=el}
                    onClick={()=>{console.log('click');console.log(this.props)}}
                >反映人</InputItem>

                <InputItem
                    clear
                    placeholder=""
                    ref={el =>  this.txtCustomer=el}
                >客户简称</InputItem>

                <InputItem
                    clear
                    placeholder="异常程序代号，如出站作业(B0206)"
                    ref={el =>  this.txtProgram=el}
                >程序名称</InputItem>

                <Picker data={this.props.bugTypes} cols={1} {...getFieldProps('district3')} className="forss"
                    ref={el =>   this.txtType=el}>
                    <List.Item arrow="horizontal">问题类型</List.Item>
                </Picker>

                <TextareaItem
                    title="问题描述"
                    placeholder="请描述问题产生情景"
                    clear
                    data-seed="logId"
                    autoHeight
                    ref={el =>  this.txtDescription=el}
                />

                <ImagePicker
                    files={this.props.imgs}
                    onChange={(files, type, index) => this.props.imgChange(files, type, index)}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.props.imgs.length < 10}
                    multiple={true}
                />
                <WhiteSpace />

                <WingBlank>
                    <Button type="primary" onClick={()=>{
                        //mobile做了封装，和web不同
                        console.log(this.txtCreator.state.value)
                        console.log(this.txtCustomer.state.value)
                        console.log(this.txtProgram.state.value)
                        console.log(this.txtType.props.value)
                        console.log(this.txtDescription.state.value)
                        if (this.txtCreator.state.value && this.txtCustomer.state.value && this.txtProgram.state.value && this.txtType.props.value.length > 0 && this.txtDescription.state.value) {
                            this.props.subFeedback({
                                creator: this.txtCreator.state.value,
                                customer: this.txtCustomer.state.value,
                                program: this.txtProgram.state.value,
                                type: this.txtType.props.value[0],
                                description: this.txtDescription.state.value
                            })
                        } else {
                            Toast.info('请完善表单数据！', 2, null, false);
                        }
                    }}>提交</Button>
                </WingBlank>

                <WhiteSpace />
            </List>

        </TitleLayout>
    )}
}

Feedback.propTypes = {
    form: formShape,
    bugTypes:PropTypes.arrayOf(PropTypes.shape({
        label:PropTypes.string.isRequired,
        value:PropTypes.string.isRequired
    }).isRequired)
}

//container
const mapStateToProps = state => {
    //console.log('main inject:');
    //console.log(formShape);
    return state.feedback
}

const mapDispatchToProps = dispatch => ({
    imgChange: (files, type, index) => { dispatch(fbImgEvent(files, type, index)); },
    subFeedback:(obj)=>{ dispatch(fbSubmit(obj))},
    push,dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Feedback));
