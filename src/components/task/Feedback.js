import React from 'react';
import { List, InputItem, TextareaItem, ImagePicker, Button, WingBlank, WhiteSpace, Picker,Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import PropTypes from 'prop-types'
import { fbImgEvent,fbSubmit } from '../../actions'
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import './feedback.css'

const Feedback = (props) => {
    console.log('fb render')
    console.log(props)
    const { getFieldProps } = props.form;
    let txtCreator,txtCustomer,txtProgram,txtType,txtDescription;
    return (
        <TitleLayout content='问题单反馈'>
            <List renderHeader={() => '请填写相关信息'}>
                <InputItem
                    {...getFieldProps('autofocus')}
                    clear
                    placeholder="Your Name"
                    ref={el => txtCreator = el}
                >反映人</InputItem>

                <InputItem
                    clear
                    placeholder="如福州明芳"
                    ref={el => txtCustomer = el}
                >客户简称</InputItem>

                <InputItem
                    clear
                    placeholder="异常程序代号，如出站作业(B0206)"
                    ref={el => txtProgram = el}
                >程序名称</InputItem>

                <Picker data={props.bugTypes} cols={1} {...getFieldProps('district3')} className="forss"
                    ref={el => txtType = el}>
                    <List.Item arrow="horizontal">问题类型</List.Item>
                </Picker>

                <TextareaItem
                    title="问题描述"
                    placeholder="请描述问题产生情景~"
                    clear
                    data-seed="logId"
                    autoHeight
                    ref={el => txtDescription = el}
                />

                <ImagePicker
                    files={props.imgs}
                    onChange={(files, type, index) => props.imgChange(files, type, index)}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={props.imgs.length < 10}
                    multiple={true}
                />
                <WhiteSpace />

                <WingBlank>
                    <Button type="primary" onClick={()=>{
                        //mobile做了封装，和web不同
                        console.log(txtCreator.state.value)
                        console.log(txtCustomer.state.value)
                        console.log(txtProgram.state.value)
                        console.log(txtType.props.value)
                        console.log(txtDescription.state.value)
                        if (txtCreator.state.value && txtCustomer.state.value && txtProgram.state.value && txtType.props.value.length > 0 && txtDescription.state.value) {
                            props.subFeedback({
                                creator: txtCreator.state.value,
                                customer: txtCustomer.state.value,
                                program: txtProgram.state.value,
                                type: txtType.props.value[0],
                                description: txtDescription.state.value
                            })
                        } else {
                            Toast.info('请完善表单数据！', 2, null, false);
                        }
                    }}>提交</Button>
                </WingBlank>

                <WhiteSpace />
            </List>
        </TitleLayout>
    )
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
    push
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Feedback));
