
const initData = {
    subData: {
        customer_no:'',
        customer: '',
        start_date:'',
        end_date:'',
        type:0
    }
}
const pr = (state = initData, action) => {
    switch (action.type) {
        case 'PR_UPDATE':
            let data={...state.subData};
            data[action.name]=action.value;
            return {
                ...state,
                subData: data
            };
        case 'PR_DETAIL':
            return {
                ...state,
                detail: action.detail
            };
        default:
            //console.log('feedback->' + action.type)
            //console.log(initData)
            return state;

    }
}

export default pr