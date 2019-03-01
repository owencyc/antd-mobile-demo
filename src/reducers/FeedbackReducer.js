import {Toast} from 'antd-mobile'

const initData={
    subData:{
        creator:'',
        customer:'',
        program:'',
        type:[],
        description:''
    },
    bugTypes:[
        {
            value:'type01',
            label:'需求设计缺陷'
        },
        {
            value:'type02',
            label:'程序bug'
        },
        {
            value:'type03',
            label:'环境问题'
        },
        {
            value:'type04',
            label:'客户需求调整（不计价）'
        }
    ],
    imgs:[]
}
const feedback = (state = {}, action) => {
    switch (action.type) {
        case 'FB_IMG':

            return {
                ...state,
                imgs:action.files
            };
        case 'FB_SUBMIT':
            let obj={...state};
            console.log('fb submit');;
            let req={...action.data};
            if(state.imgs.length>0){
                //有图片附件
                req.imgs=state.imgs;
            }
            console.log(req);
            //模拟发送
            Toast.loading('Loading...', 2, () => {
                console.log('Load complete !!!');
              });
            return obj;
        default:
            console.log('feedback->'+action.type)
            console.log(initData)
            return initData;

    }
}

export default feedback