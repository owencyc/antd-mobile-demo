import { Toast } from 'antd-mobile'
import { push } from 'connected-react-router';
import { history } from '../configureStore'
import func_report from './../assets/func_report.svg'
import func_time from './../assets/func_time.svg'
import func_work from './../assets/func_work.svg'
import chart_c_bar from './../assets/chart_c_bar.svg'
import calendar from './../assets/calendar.svg'
import func_excel from './../assets/func_excel.svg'

const initData = {
    info: {
        user_code: '',
        user_no: '',
        user_name: '',
        dept_no: ''
    },
    grids:[
        {
            title:'问题单',
            func:[{
                icon: func_report,
                text: '记录',
                router: '/fbstation'
            },
            {
                icon: func_excel,
                text: '管制表',
                router: '/fbexcel'
            }]
        },
        {
            title:'预估',
            func:[{
                icon: func_time,
                text: '记录',
                router: '/rsstation'
            },{
                icon: chart_c_bar,
                text: '预估兑现',
                router: '/prschart'
            }]
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
            //console.log('user->' + action.type)
            //console.log(initData)
            if (state.info && state.info.user_code === '') {
                //console.log('user->return')
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