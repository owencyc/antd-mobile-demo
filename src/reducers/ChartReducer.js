

const initData = {
    list:[
        {
            name:'报工统计',
            icon:'http://221.226.187.245:8888/icon/chart_bar.svg',
            router:'/bgchart'
        },
        {
            name:'问题单统计',
            icon:'http://221.226.187.245:8888/icon/chart_line.svg',
            router:'/fbchart'
        },
        {
            name:'时数预估统计',
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