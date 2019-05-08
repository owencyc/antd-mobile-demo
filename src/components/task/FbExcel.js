import React, { Component } from 'react'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import TitleLayout from '../../layouts/TitleLayout'
import { getJsConfig, getExcel } from '../../services'
import { createForm, formShape } from 'rc-form';
import { List, Button, InputItem, Modal,Toast,WhiteSpace } from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

class FbExcel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }
    }
    componentDidMount() {
        let url = encodeURIComponent(window.location.href);
        // getJsConfig(url).then((config)=>{
        //   if(config.status===0){
        //     //wechat js 认证
        //     window.wx.config({
        //       beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //       appId: config.result.appId, // 必填，企业微信的corpID
        //       timestamp: +config.result.timestamp, // 必填，生成签名的时间戳
        //       nonceStr: config.result.nonceStr, // 必填，生成签名的随机串
        //       signature: config.result.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        //       jsApiList: ['previewFile'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        //     });
        //   }
        // })
    }

    onClose = () => {
        this.setState({
            modal: false,
        });
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <TitleLayout content='问题管制表' >
                <List className="my-list">
                    <InputItem
                        {...getFieldProps('customer', {
                            initialValue: this.props.detail.customer
                        })}
                        editable={false}
                        placeholder="请点击选择客户"
                        onClick={() => { this.props.getCustomer() }}
                    >客户简称</InputItem>

                    <WhiteSpace size='xl' />

                    <Button type="primary" onClick={() => {
                        let data = this.props.form.getFieldsValue();
                        console.log(data);
                        if (this.props.detail.customer_no) {
                            Toast.loading('正在生成',0);
                            getExcel(this.props.detail.customer_no).then(res => {
                                Toast.hide();
                                if (res.status === 0) {
                                    this.setState({
                                        modal: true,
                                    });
                                }else{
                                    Toast.offline(res.exception, 3);
                                }
                            })
                        }
                    }}>产生管制表</Button>

                </List>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose}
                    title="提示"
                    footer={[{ text: 'Ok', onPress: () => { this.onClose(); } }]}
                >
                    <div>
                        问题管制表已生成，请查收邮件！
          </div>
                </Modal>
            </TitleLayout>
        )
    }

}

const mapStateToProps = state => {
    return {
        detail: state.feedback.excel
    }
}
const mapDispatchToProps = dispatch => ({
    getCustomer: () => { dispatch(push({ pathname: '/search', state: { type: 'customer', from: 'fb_xls', title: '选择客户' } })) },
    back: () => { dispatch(goBack()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(FbExcel));