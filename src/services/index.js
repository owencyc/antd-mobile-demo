import { ajaxApi }  from '../utils/request'

const apiPath='http://221.226.187.245:8888/wechatapi/api/adapter';
//const apiPath='http://localhost:51281/api/adapter';

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

//问题单结案
export const endFeedback = (info)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'EndFeedback',data:info}})

//问题单详情
export const getFbDetail = (no)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'GetDetail',data:no}})

//获取问题单清单
export const getReserves = (page)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Reserve',method:'GetReserves',data:{page:page}}})

//删除预估
export const delReserve = (no)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Reserve',method:'DelReserve',data:no}})

//时数预估报表
export const getRsChart = (year)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Chart',method:'GetReserveData',data:{year:year}}})

//问题单图表
export const getFbChart = (year)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Chart',method:'GetFeedbackData',data:{year:year}}})

//个人时数预估兑现报表
export const getPersonRsChart = (month)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Chart',method:'GetPersonRsData',data:{year:month}}})

//查询个人行程
export const getCalendar = (date)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Calendar',method:'Query',data:date}})

//新增个人行程
export const addCalendar = (info)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Calendar',method:'Add',data:info}})

//行事历报表
export const getCalendarChart = (month)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Chart',method:'GetCalendarData',data:{year:month}}})

//删除行程
export const delCalendar = (no)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Calendar',method:'Del',data:no}})

//问题管制表
export const getExcel = (no)=>ajaxApi(apiPath,
{method:'post',data:{uri:'Feedback',method:'GetExcel',data:no}})

//参数获取
export const GetWorkInfo = ()=>ajaxApi(apiPath,
{method:'post',data:{uri:'User',method:'GetWorkInfo',data:{}}})