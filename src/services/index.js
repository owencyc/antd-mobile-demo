import { ajaxApi }  from '../utils/request'

export const allComments = (url,data) =>ajaxApi(url,{method:"get",data})

export const getToken=()=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Wechat',method:'GetToken',data:{}}})

export const getUserinfo=(code)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Wechat',method:'GetUserInfo',data:code}})
//获取客户信息列表
export const getCustomers = ()=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Feedback',method:'GetCustomers',data:{}}})
//问题单提交
export const generateDZ = (data)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Feedback',method:'Excute',data:data}})

//获取问题单清单
export const getFeedbacks = ()=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Feedback',method:'GetFeedbacks',data:{}}})

//获取客户信息 开窗
export const getSearch = (type)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Search',method:'Query',data:type}})

//获取程序
export const getPrograms = (customer)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Feedback',method:'GetPrograms',data:customer}})

//时数预估提交
export const subReserve = (data)=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'Reserve',method:'Add',data:data}})

//参数获取
export const getPara = ()=>ajaxApi('http://221.226.187.245:8888/wechatapi/api/adapter',
{method:'post',data:{uri:'User',method:'GetPara',data:{}}})