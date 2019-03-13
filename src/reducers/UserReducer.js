import { Toast } from 'antd-mobile'
import { push } from 'connected-react-router';
import { history } from '../configureStore'

const initData = {
    info: {
        user_code: '',
        user_no: '',
        user_name: '',
        dept_no: ''
    }
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