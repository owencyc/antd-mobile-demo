const initData={
    loaded:false
}
const app = (state = initData, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {...state,loaded:true};
        default:
            return state;

    }
}

export default app