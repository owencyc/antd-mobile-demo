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
//问题反馈 获取客户
export const fbInit=(data)=>({
    type:'FB_INIT',
    customers:data
})

//问题反馈图片事件
export const fbImgEvent = (files, type, index)=>({
    type:'FB_IMG',
    files, index
})
//问题反馈提交
export const fbSubmit = (data)=>({
    type:'FB_SUBMIT',
    data
})

//我的页面，数据加载
export const myInit = ()=>({
    type:'MY_INIT'
})