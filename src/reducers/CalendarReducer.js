const initData = {
    subData: {
        creator: '',
        creator_no:'',
        customer_no:'',
        customer: '',
        destination:'',
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
        default:
            return state;

    }
}

export default calendar