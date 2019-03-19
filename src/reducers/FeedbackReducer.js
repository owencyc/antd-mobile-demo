import { Toast } from 'antd-mobile'
import { push } from 'connected-react-router';
import { history } from '../configureStore'
import {getCustomers} from '../services'

const initData = {
    subData: {
        creator: '',
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
    customers:[]
}
const feedback = (state = initData, action) => {
    switch (action.type) {
        case 'FB_INIT':
            console.log('FB_INIT')
            let customers=[];
            action.customers.map((item)=>{
                customers.push({value:item.key,label:item.value});
            })
            console.log(customers)
            return {...state,customers:customers};
        case 'FB_IMG':

            return {
                ...state,
                imgs: action.files
            };
        case 'FB_SUBMIT':
            let obj = { ...state };
            console.log('fb submit');;
            // let req = { ...action.data };
            // if (state.imgs.length > 0) {
            //     //有图片附件
            //     req.imgs = state.imgs;
            // }
            // console.log(req);
            // //模拟发送
            // Toast.loading('提交中...', 2, () => {
            //     history.push({ pathname: '/result', state: { value: 'success' } });
            //     console.log('Load complete !!!');
            // });
            
            return obj;
        default:
            console.log('feedback->' + action.type)
            //console.log(initData)
            return state;

    }
}

export default feedback