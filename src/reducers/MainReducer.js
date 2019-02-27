import home0 from '../assets/home_0.svg';
import home1 from '../assets/home_1.svg';
import task0 from '../assets/task_0.svg';
import task1 from '../assets/task_1.svg';
import msg0 from '../assets/msg_0.svg';
import msg1 from '../assets/msg_1.svg';
import user0 from '../assets/user_0.svg';
import user1 from '../assets/user_1.svg';

import { push } from 'connected-react-router'


const initData={
    selectedTab:'home',
    menus:[
        {
            key:'home',
            title:'主页',
            icon0:'url(http://116.62.136.201/wechat/icon/home_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://116.62.136.201/wechat/icon/home_1.svg) center center /  21px 21px no-repeat',
            router:'/home'
        },
        {
            key:'task',
            title:'工作',
            icon0:'url(http://116.62.136.201/wechat/icon/task_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://116.62.136.201/wechat/icon/task_1.svg) center center /  21px 21px no-repeat',
            router:'/task'
        },
        {
            key:'msg',
            title:'消息',
            icon0:'url(http://116.62.136.201/wechat/icon/msg_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://116.62.136.201/wechat/icon/msg_1.svg) center center /  21px 21px no-repeat',
            router:'/msg'
        },
        {
            key:'user',
            title:'我的',
            icon0:'url(http://116.62.136.201/wechat/icon/user_0.svg) center center /  21px 21px no-repeat',
            icon1:'url(http://116.62.136.201/wechat/icon/user_1.svg) center center /  21px 21px no-repeat',
            router:'/user'
        }
    ]
}
const main = (state = {}, action) => {
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
            console.log(action.type)
            let new_state=state.selectedTab ? state : initData;
            console.log(new_state);
            return new_state;

    }
}

export default main