const initData={
    loaded:false,
    signature:'',
    url:''
}
const app = (state = initData, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {...state,loaded:true};
            case 'APP_JS':
            return {...state,signature:action.signature};
            case 'APP_URL':
            return {...state,url:action.url};
        default:
            return state;

    }
}

export default app