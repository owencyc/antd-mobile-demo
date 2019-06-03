

const initData = {
    list:[
        
        {
            name:'程序品质分析',
            icon:'http://221.226.187.245:8888/icon/chart_line.svg',
            router:'/fbchart'
        },
        {
            name:'个案预估兑现',
            icon:'http://221.226.187.245:8888/icon/chart_bar.svg',
            router:'/rschart'
        }
    ]
}
const chart = (state = initData, action) => {
    switch (action.type) {
        
        default:
            return state;

    }
}

export default chart