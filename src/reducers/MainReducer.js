import home0 from '../assets/home_0.svg';
import home1 from '../assets/home_1.svg';
import task0 from '../assets/task_0.svg';
import task1 from '../assets/task_1.svg';
import msg0 from '../assets/msg_0.svg';
import msg1 from '../assets/msg_1.svg';
import user0 from '../assets/user_0.svg';
import user1 from '../assets/user_1.svg';

import { push } from 'connected-react-router'
import Home from '../containers/HomeContainer'
import User from '../components/user/User'

const initData={
    selectedTab:'home',
    menus:[
        {
            key:'home',
            title:'主页',
            icon0:'url(http://221.226.187.245:8888/icon/home_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://221.226.187.245:8888/icon/home_1.svg) center center /  21px 21px no-repeat',
            router:'/home',
            component:Home
        },
        {
            key:'chart',
            title:'报表',
            icon0:'url(http://221.226.187.245:8888/icon/task_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://221.226.187.245:8888/icon/task_1.svg) center center /  21px 21px no-repeat',
            router:'/chart'
        },
        {
            key:'msg',
            title:'消息',
            icon0:'url(http://221.226.187.245:8888/icon/msg_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://221.226.187.245:8888/icon/msg_1.svg) center center /  21px 21px no-repeat',
            router:'/msg'
        },
        {
            key:'user',
            title:'我的',
            icon0:'url(http://221.226.187.245:8888/icon/user_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://221.226.187.245:8888/icon/user_1.svg) center center /  21px 21px no-repeat',
            router:'/user'
        }
    ]
}
const main = (state = initData, action) => {
    switch (action.type) {
        case 'MENU':
            console.log('切换菜单：'+action.router);
            const { menus} = state;
            //push(action.router);
            console.log(menus[action.index])
            let obj={
                ...state,
                selectedTab:menus[action.index].key
             };
             console.log(obj);
            return obj;
        default:
            // console.log(action.type)
            // let new_state=state.selectedTab ? state : initData;
            // console.log(new_state);
            return state;

    }
}

export default main