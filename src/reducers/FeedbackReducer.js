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
            value: 'type01',
            label: '需求设计缺陷'
        },
        {
            value: 'type02',
            label: '程序bug'
        },
        {
            value: 'type03',
            label: '环境问题'
        },
        {
            value: 'type04',
            label: '客户需求调整（不计价）'
        }
    ],
    imgs: [],
    customers:[]
}
const feedback = (state = initData, action) => {
    switch (action.type) {
        case 'FB_INIT':
        // getCustomers().then((res)=>{
        //     if(res.status===0)
        //         return {...initData,customers:res.result};
        // })
            console.log('FB_INIT')
            return {...initData,customers:action.customers};
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