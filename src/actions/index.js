import {generateDZ,getCustomers} from '../services'
import { push } from 'connected-react-router'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
//首页快捷入口事件
export const navEvent = router => ({
    type: 'NAVICATE',
    router
})

//底部菜单切换事件
export const menuEvent = (router,index) => ({
    type: 'MENU',
    router,index
})
//获取客户
export const fbInit = ()=>{
    return (dispatch)=>{
        getCustomers().then((res)=>{
            if(res.status===0){
                const action=fbInited(res.result);
                dispatch(action);
            }else{
                Toast.offline(res.exception, 2);
            }
        })
    }
}
//问题反馈 获取客户
export const fbInited=(data)=>({
    type:'FB_INIT',
    customers:data
})

//问题反馈图片事件
export const fbImgEvent = (files, type, index)=>({
    type:'FB_IMG',
    files, index
})
//问题反馈提交
export const fbSubmit = (data)=>{
    return (dispatch)=>{
        generateDZ(data).then((res)=>{
            if(res.status===0){
                dispatch(push({ pathname: '/result', state: { value: 'success' ,data:'确认书号：'+res.result.confirm_no} }));
                //const action=fbSubmited({});
                //dispatch(action);
            }else{
                Toast.offline(res.exception, 2);
            }
        })
    }
}
export const fbSubmited = (data)=>({
    type:'FB_SUBMIT',
    data
})

//我的页面，数据加载
export const myInit = ()=>({
    type:'MY_INIT'
})