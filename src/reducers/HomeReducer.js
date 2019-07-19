import img0 from './../assets/carousel_0.jpg';
import img1 from './../assets/carousel_1.jpg';
import img2 from './../assets/carousel_2.jpg';
import img3 from './../assets/carousel_3.jpg';
import func_report from './../assets/func_report.svg'
import func_time from './../assets/func_time.svg'
import func_program from './../assets/func_program.svg'
import func_work from './../assets/func_work.svg'
import { allComments } from './../services/index'
import { push } from 'connected-react-router'

const initData = {
    user: '',
    imgs: [img0, img1, img2, img3],
    funcs: [
        
        {
            icon: func_report,
            text: '问题单',
            router: '/feedback'
        },
        {
            icon: func_time,
            text: '时数预估',
            router: '/reserve'
        },
        {
            icon: func_program,
            text: '个案追踪',
            router: '/prstation'
        }
    ],
    notice: '',
    onHand:0,
    waitEnd:0,
    nextUsage:0
}
const home = (state = initData, action) => {
    switch (action.type) {
        case 'HOME_NAVICATE':
            //console.log('触发路由：' + action.router);
            //push(action.router);
            return state;
        case 'HOME_NOTICE':
            return {...state,notice:action.notice};
        case 'HOME_UPDATE':
            let data={...state};
            data[action.name]=action.value;
            return data;
        default:
            return state;

    }
}

export default home