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
        program_no: '',
        program: '',
        type: [],
        urgent:[],
        description: ''
    },
    urgentTypes:[
        {
            value: '001',
            label: '一般'
        },
        {
            value: '002',
            label: '急'
        },
        {
            value: '003',
            label: '特急'
        },
        {
            value: '004',
            label: '专案控制'
        },
        {
            value: '005',
            label: '客户投诉'
        }
    ],
    bugTypes: [
        {
            value: '8102',
            label: '个案程序bug'
        },
        {
            value: '8104',
            label: '数据异常（调整或修改）'
        },
        {
            value: '8105',
            label: '环境问题'
        },
        {
            value: '8109',
            label: '需求遗漏/错误'
        },
        {
            value: '8202',
            label: '新个案需求'
        }
    ],
    imgs: [],
    programs: [],
    detail:{},
    endData:{
        no:'',
        type: [],
        description:''
    },
    excel:{
        customer_no:'',
        customer:'',
    }
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
        case 'FB_UPDATE_END':
            let d={...state.endData};
            d[action.name]=action.value;
            return {
                ...state,
                endData: d
            };
        case 'FB_UPDATE_XLS':
            d={...state.excel};
            d[action.name]=action.value;
            return {
                ...state,
                excel: d
            };
        case 'FB_SUBMITED':
            //清空表单
            return initData;
        case 'FB_DETAIL':
            return {
                ...state,
                detail: action.detail
            };
        default:
            console.log('feedback->' + action.type)
            //console.log(initData)
            return state;

    }
}

export default feedback