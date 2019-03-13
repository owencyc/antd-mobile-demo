import { ajaxApi }  from '../utils/request'

export const allComments = (url,data) =>ajaxApi(url,{method:"get",data})

export const getToken=()=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Wechat',method:'GetToken',data:{}}})

export const getUserinfo=(code)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Wechat',method:'GetUserInfo',data:code}})

export const getCustomers = (code)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Feedback',method:'GetCustomers',data:{}}})