import img0 from './../assets/carousel_0.jpg';
import img1 from './../assets/carousel_1.jpg';
import img2 from './../assets/carousel_2.jpg';
import img3 from './../assets/carousel_3.jpg';
import func_report from './../assets/func_report.svg'
import func_time from './../assets/func_time.svg'
import func_work from './../assets/func_work.svg'
import { allComments } from './../services/index'
import { push } from 'connected-react-router'


const initData = {
    user: '',
    imgs: [img0, img1, img2, img3],
    funcs: [
        {
            icon: func_work,
            text: '项目报工',
            router: '/sss'
        },
        {
            icon: func_report,
            text: '问题单',
            router: '/feedback'
        },
        {
            icon: func_time,
            text: '时数预估',
            router: '/reserve'
        }
    ],
    notice: ''
}
const home = (state = initData, action) => {
    switch (action.type) {
        case 'NAVICATE':
            console.log('触发路由：' + action.router);
            //push(action.router);
            return state;
        case 'HOME_NOTICE':
            return {...state,notice:action.notice};
        default:
            return state;

    }
}

export default home