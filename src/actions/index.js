import {generateDZ,getPrograms,subReserve,addCalendar} from '../services'
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
export const fbInit = (customer_no)=>{
    return (dispatch)=>{
        getPrograms(customer_no).then((res)=>{
            if(res.status===0){
                const action=fbInited(res.result);
                dispatch(action);
            }else{
                Toast.offline(res.exception, 2);
            }
        })
    }
}
//问题反馈 获取程序
export const fbInited=(data)=>({
    type:'FB_INIT',
    programs:data
})

//问题反馈图片事件
export const fbImgEvent = (files, type, index)=>({
    type:'FB_IMG',
    files, index
})
//问题反馈更新表单
export const fbUpdate = (name,value)=>({
    type:'FB_UPDATE',
    name:name,
    value:value
})
//问题结案更新表单
export const fbUpdateEnd = (name,value)=>({
    type:'FB_UPDATE_END',
    name:name,
    value:value
})
//问题excel更新表单
export const fbUpdateXls = (name,value)=>({
    type:'FB_UPDATE_XLS',
    name:name,
    value:value
})
//问题反馈提交
export const fbSubmit = (data)=>{
    return (dispatch)=>{
        Toast.loading('正在提交',0);
        generateDZ(data).then((res)=>{
            Toast.hide();
            if(res.status===0){
                dispatch(push({ pathname: '/result', state: { value: 'success' ,data:'问题单号：'+res.result.confirm_no,to:'/fbstation'} }));
                const action=fbSubmited();
                dispatch(action);
            }else{
                Toast.offline(res.exception, 2);
            }
        })
    }
}
export const fbSubmited = ()=>({
    type:'FB_SUBMITED'
})

//我的页面，数据加载
export const myInit = ()=>({
    type:'MY_INIT'
})

//时数预约更新表单
export const rsUpdate = (name,value)=>({
    type:'RS_UPDATE',
    name:name,
    value:value
})

//APP初始化标识
export const appLoad = ()=>({
    type:'APP_LOAD'
})
//APP js
export const appJs = (signature)=>({
    type:'APP_JS',
    signature:signature
})
export const appUrl = (data)=>({
    type:'APP_URL',
    url:data
})

//通知更新
export const homeNotice = (data)=>({
    type:'HOME_NOTICE',
    notice:data
})

//时数预估提交
export const rsSubmit = (data)=>{
    return (dispatch)=>{
        Toast.loading('正在提交',0);
        subReserve(data).then((res)=>{
            Toast.hide();
            if(res.status===0){
                console.log(res);
                dispatch(push({ pathname: '/result', state: { value: 'success',to:'/rsstation' } }));
                const action=rsSubmited();
                dispatch(action);
            }else{
                Toast.offline(res.exception, 2);
            }
        })
    }
}
export const rsSubmited = ()=>({
    type:'RS_SUBMITED'
})

//问题反馈更新表单
export const fbDetail = (data)=>({
    type:'FB_DETAIL',
    detail:data
})

//时数预估更新表单
export const rsDetail = (data)=>({
    type:'RS_DETAIL',
    detail:data
})

//行程更新表单
export const cdUpdate = (name,value)=>({
    type:'CD_UPDATE',
    name:name,
    value:value
})

//创建行程
export const cdSubmit = (data,callback)=>{
    return (dispatch)=>{
        Toast.loading('正在创建',0);
        addCalendar(data).then((res)=>{
            Toast.hide();
            if(res.status===0){
                const action=cdSubmited();
                dispatch(action);
                if(callback)
                    callback();
            }else{
                Toast.offline(res.exception, 2);
            }
        })
    }
}

export const cdSubmited = ()=>({
    type:'CD_SUBMITED'
})