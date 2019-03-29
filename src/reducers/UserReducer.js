import { Toast } from 'antd-mobile'
import { push } from 'connected-react-router';
import { history } from '../configureStore'
import func_report from './../assets/func_report.svg'
import func_time from './../assets/func_time.svg'
import func_work from './../assets/func_work.svg'

const initData = {
    info: {
        user_code: '',
        user_no: '',
        user_name: '',
        dept_no: ''
    },
    funcs: [
        {
            icon: func_report,
            text: '问题单列表',
            router: '/fbstation'
        },
        {
            icon: func_work,
            text: '项目报工记录',
            router: '/sss'
        },
        {
            icon: func_time,
            text: '时数预约记录',
            router: '/rslog'
        }
      ]
}
const user = (state = initData, action) => {
    switch (action.type) {
        case 'MY_INIT':
            let obj = JSON.parse(localStorage.getItem('user_info'));
            return {
                ...initData,
                obj
            };
        default:
            console.log('user->' + action.type)
            //console.log(initData)
            if (state.info && state.info.user_code === '') {
                console.log('user->return')
                let obj = JSON.parse(localStorage.getItem('user_info'));
                return obj ? {
                    ...initData,
                    info: obj
                }:initData;

            } else {
                return state;
            }

    }
}

export default user