import { ajaxApi }  from '../utils/request'

//const apiPath='http://221.226.187.245:8888/wechatapi/api/adapter';
const apiPath='http://localhost:51281/api/adapter';

export const allComments = (url,data) =>ajaxApi(url,{method:"get",data})

export const getToken=()=>ajaxApi(apiPath,
{method:'post',data:{uri:'Wechat',method:'GetToken',data:{}}})

export const getUserinfo=(code)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Wechat',method:'GetUserInfo',data:code}})
//获取客户信息列表
export const getCustomers = ()=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'GetCustomers',data:{}}})
//问题单提交
export const generateDZ = (data)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'Excute',data:data}})

//获取问题单清单
export const getFeedbacks = (status)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'GetFeedbacks',data:status}})

//获取客户信息 开窗
export const getSearch = (type,para)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Search',method:'Query',data:{type:type,para:para}}})

//获取程序
export const getPrograms = (customer)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'GetPrograms',data:customer}})

//时数预估提交
export const subReserve = (data)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Reserve',method:'Add',data:data}})

//参数获取
export const getPara = ()=>ajaxApi(apiPath,
{method:'post',data:{uri:'User',method:'GetPara',data:{}}})

//js ticket获取
export const getJsConfig = (url)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Wechat',method:'GetJsConfig',data:url}})

//删除问题单
export const delFeedback = (no)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'DelFeedback',data:no}})

//获取问题单清单
export const getReserves = (page)=>ajaxApi(apiPath,
    {method:'post',data:{uri:'Reserve',method:'GetReserves',data:{page:page}}})