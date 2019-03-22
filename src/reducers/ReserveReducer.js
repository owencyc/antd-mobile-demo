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
        plan_hours: '',
        plan_start_date:'',
        plan_complete_date:'',
        description: ''
    }
}
const reserve = (state = initData, action) => {
    switch (action.type) {
        case 'RS_UPDATE':
            let data={...state.subData};
            data[action.name]=action.value;
            return {
                ...state,
                subData: data
            };
        case 'RS_SUBMIT':
            let obj = { ...state };
            console.log('RS submit');

            return obj;
        default:
            console.log('reserve->' + action.type)
            return state;

    }
}

export default reserve