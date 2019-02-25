import { ajaxApi }  from '../utils/request'

export const allComments = (url,data) =>ajaxApi(url,{method:"get",data})