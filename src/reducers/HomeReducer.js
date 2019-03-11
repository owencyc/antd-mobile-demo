import img0 from './../assets/carousel_0.jpg';
import img1 from './../assets/carousel_1.jpg';
import img2 from './../assets/carousel_2.jpg';
import img3 from './../assets/carousel_3.jpg';
import func_report from './../assets/func_report.svg'
import func_time from './../assets/func_time.svg'
import {allComments} from './../services/index'
import { push } from 'connected-react-router'


const initData={
    imgs:[img0,img1,img2,img3],
    funcs:[
        {
            icon: func_report,
            text: '问题反馈',
            router:'/feedback'
        },
        {
            icon: func_time,
            text: '时数预估',
            router:'/time'
        }
    ],
    notice:'通知：本功能为模拟上线，遇到问题，切勿惊慌，联系应用开发部~'
}
const home = (state = null, action) => {
    switch (action.type) {
        case 'NAVICATE':
            console.log('触发路由：'+action.router);
            //push(action.router);
            return initData;
        default:
            if(state==null){
            console.log(action.type);
            allComments('https://www.easy-mock.com/mock/5c68f1f1160b1240c2965a90/api/allcomments').then((obj)=>{
                console.log('allcomment');
                console.log(obj)
            },(obj)=>{
                console.log(obj)
            })
            // console.log(initData)
            return initData;
        }else{
            return state;
        }

    }
}

export default home