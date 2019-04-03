

const initData = {
    list:[
        {
            name:'统计时数预估',
            icon:'http://221.226.187.245:8888/icon/chart_bar.svg',
            router:'/rschart'
        },
        {
            name:'统计问题单',
            icon:'http://221.226.187.245:8888/icon/chart_line.svg',
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