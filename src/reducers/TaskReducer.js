import func_report from './../assets/func_report.svg'
import func_time from './../assets/func_time.svg'

const initData = {
    funcs: [
        {
            icon: func_report,
            text: '反馈记录',
            router: '/fbstation'
        },
        {
            icon: func_time,
            text: '预约记录',
            router: '/rslog'
        }
      ]
}
const task = (state = initData, action) => {
    switch (action.type) {
        
        default:
            return state;

    }
}

export default task