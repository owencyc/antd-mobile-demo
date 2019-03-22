import { Toast } from 'antd-mobile'
import { push } from 'connected-react-router';
import { history } from '../configureStore'
import { getCustomers } from '../services'

const initData = {
    subData: {
        creator: '',
        creator_code:'',
        customer_no:'',
        customer: '',
        program: '',
        type: [],
        description: ''
    },
    bugTypes: [
        {
            value: '8202',
            label: '新个案需求'
        },
        {
            value: '8102',
            label: '个案程序bug'
        },
        {
            value: '8105',
            label: '安装或环境配置'
        },
        {
            value: '8109',
            label: '功能建议'
        }
    ],
    imgs: [],
    programs: []
}
const feedback = (state = initData, action) => {
    switch (action.type) {
        case 'FB_INIT':
            console.log('FB_INIT')
            // let programs = [];
            // action.programs.map((item) => {
            //     programs.push({ value: item.key, label: item.value });
            // })
            // console.log(programs)
            return { ...state, programs: action.programs };
        case 'FB_IMG':

            return {
                ...state,
                imgs: action.files
            };
        case 'FB_UPDATE':
            let data={...state.subData};
            data[action.name]=action.value;
            return {
                ...state,
                subData: data
            };
        case 'FB_SUBMIT':
            //清空表单
            return initData;
        default:
            console.log('feedback->' + action.type)
            //console.log(initData)
            return state;

    }
}

export default feedback