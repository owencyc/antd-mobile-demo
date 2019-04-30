
const initData = {
    subData: {
        creator: '',
        creator_no:'',
        customer_no:'',
        customer: '',
        destination:[],
        begin_time: [],
        end_time:[],
        title:'',
        remark: '',
        dates:[]
    },
    
}
const calendar = (state = initData, action) => {
    switch (action.type) {
        case 'CD_UPDATE':
            let data={...state.subData};
            data[action.name]=action.value;
            return {
                ...state,
                subData: data
            };
        case 'CD_SUBMITED':
            //清空表单
            let tmp={
                ...state.subData,
                customer_no:'',
                customer: '',
                destination:[],
                begin_time: [],
                end_time:[],
                title:'',
                remark: ''
            };
            return {...state,subData:tmp};
        default:
            return state;

    }
}

export default calendar