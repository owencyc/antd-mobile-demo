import React,{Component} from 'react';
import { List, InputItem, TextareaItem, ImagePicker, Button, WingBlank, WhiteSpace, Picker,Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import PropTypes from 'prop-types'
import { fbImgEvent,fbSubmit,fbInit ,fbUpdate} from '../../actions'
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compress } from '../../utils/imageHandler'
import './feedback.css'



class Feedback extends Component  {
    constructor(props){
        console.log('fb render')
        console.log(props)
        super(props);

        
    }
    componentDidMount(){
        console.log('fb=>componentDidMount');
        // if(this.props.customers.length===0){
        //     this.props.dispatch(fbInit())
        // }
        let tmp = localStorage.getItem("user_info");
        this.props.updateData('creator',tmp?JSON.parse(tmp).user_name:'');
        this.props.updateData('creator_code',tmp?JSON.parse(tmp).user_code:'');
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
                    {...getFieldProps('creator',{
                        initialValue: this.props.subData.creator
                      })}
                      editable={false}
                    placeholder=""
                    ref={el => this.txtCreator=el}
                >反映人</InputItem>

                
                {/* <Picker data={this.props.customers} cols={1}
                     {...getFieldProps('customer',{
                        initialValue: this.props.subData.customer,
                        onChange:(e)=>{this.props.updateData('customer',e)}
                      })} 
                     className="forss"
                    ref={el =>   this.txtCustomer=el}>
                    <List.Item arrow="horizontal">客户简称</List.Item>
                </Picker> */}

                <InputItem
                    {...getFieldProps('customer',{
                        initialValue: this.props.subData.customer
                      })}
                      editable={false}
                    placeholder=""
                    onClick={()=>{this.props.getCustomer()}}
                    ref={el => this.txtCustomer=el}
                >客户简称</InputItem>

                <InputItem
                    clear
                    placeholder="异常程序代号，如出站作业(B0206)"
                    ref={el =>  this.txtProgram=el}
                    {...getFieldProps('program',{
                        initialValue: this.props.subData.program,
                        onChange:(e)=>{this.props.updateData('program',e)}
                      })}
                >程序名称</InputItem>

                <Picker data={this.props.bugTypes} cols={1} 
                    {...getFieldProps('type',{
                        initialValue: this.props.subData.type,
                        onChange:(e)=>{this.props.updateData('type',e)}
                      })} 
                    className="forss"
                    ref={el =>   this.txtType=el}>
                    <List.Item arrow="horizontal">问题类型</List.Item>
                </Picker>

                <TextareaItem
                    title="问题描述"
                    placeholder="请描述问题产生情景"
                    clear
                    data-seed="logId"
                    autoHeight
                    {...getFieldProps('description',{
                        initialValue: this.props.subData.description,
                        onChange:(e)=>{this.props.updateData('description',e)}
                      })}
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
                        let data=this.props.form.getFieldsValue();
                        console.log(data);
                        //mobile做了封装，和web不同
                        //console.log(this.txtCreator.state.value)
                        // console.log(this.txtCustomer.props)
                        // console.log(this.txtProgram.state.value)
                        // console.log(this.txtType.props)
                        // console.log(this.txtDescription.state.value)
                        // console.log(this.props.imgs)
                        let imgs = [];
                        //if (this.txtCreator.state.value && this.txtCustomer.props.value && this.txtCustomer.props.value.length>0 && this.txtProgram.state.value && this.txtType.props.value && this.txtType.props.value.length > 0 && this.txtDescription.state.value){
                        if (data.creator && data.customer && data.program && data.description && data.type.length>0){
                            let req={
                                creator: this.props.subData.creator_code,
                                customer_id: this.props.subData.customer_no,
                                program_no: data.program,
                                program_name: data.program,
                                type: data.type[0],
                                remark: data.description,
                                urgent:'001',
                                imgs:[]
                            }
                            if(this.props.imgs.length>0){
                                this.props.imgs.map((item) => {
                                    compress(item.url, (result) => {
                                        console.log(result);
                                        imgs.push({
                                            name: item.file.name,
                                            type: item.file.type,
                                            source: result
                                        })
                                        //当所有图片都压缩完成后，执行提交动作
                                        if(imgs.length===this.props.imgs.length){
                                            this.props.subFeedback({...req,imgs:imgs})
                                        }
                                    });
                                })
                            }else{
                                this.props.subFeedback(req);
                            }
                        }else {
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
    updateData:(name,value)=>{dispatch(fbUpdate(name,value))},
    imgChange: (files, type, index) => { dispatch(fbImgEvent(files, type, index)); },
    subFeedback:(obj)=>{ dispatch(fbSubmit(obj))},
    getCustomer:()=>{dispatch(push({ pathname: '/search', state: { type: 'customer' } }))},
    push,dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Feedback));
