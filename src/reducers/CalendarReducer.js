let tmp = localStorage.getItem("user_info");
const initData = {
    subData: {
        creator: JSON.parse(tmp).user_name,
        creator_no:JSON.parse(tmp).user_no,
        customer_no:'',
        customer: '',
        destination:[],
        begin_time: '',
        end_time:'',
        title:'',
        remark: ''
    }
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
            return initData;
        default:
            return state;

    }
}

export default calendar