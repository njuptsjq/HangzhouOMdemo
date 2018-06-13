var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
option = {

    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['预警', '告警', '通知']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: true,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],

    yAxis: [{
        type: 'value'
    }],
    series: [{
        name: '预警',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [2, 3, 1, 4, 9, 2, 10],
        itemStyle: {
            normal: {
                color: '#59aea2'
            },
            emphasis: {

            }
        }
    },
        {
            name: '告警',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [2, 8, 9, 3, 2, 3, 1],
            itemStyle: {
                normal: {
                    color: '#e7505a'
                }
            }
        },
        {
            name: '通知',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [5, 2, 2, 4, 9, 3, 4],
            itemStyle: {
                normal: {
                    color: '#32c5d2'
                }
            }
        }
    ]
};
echartsA.setOption(option);