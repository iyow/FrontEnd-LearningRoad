
    // 完整柱状图
    // 整个SVG画布的右上角为(0,0)坐标原点
    let BarChart_Svg = d3.select('body').append('svg').attr('width', 960).attr('height', 600)
    let BarChart_SvgWidth = BarChart_Svg.attr('width')
    let BarChart_SvgHeight = BarChart_Svg.attr('height')
    let BarChart_G = BarChart_Svg.append('g').attr("transform", "translate(" + margin.top + "," + margin.left + ")")

    let BarChart_DataSet = [10, 20, 30, 23, 13, 40, 27, 35, 20]


    // x轴 scaleBand()根据domain 等分range（rangeRound）域
    let BarChart_Xscale = d3.scaleBand().domain(d3.range(BarChart_DataSet.length)).rangeRound([0, BarChart_SvgWidth - margin.left -
        margin.right
    ])
    let BarChart_XAxis = d3.axisBottom(BarChart_Xscale)

    // y轴 线性比例尺
    let BarChart_Yscale = d3.scaleLinear().domain([0, d3.max(BarChart_DataSet)]).range([BarChart_SvgHeight - margin.top - margin.bottom,
        0
    ])
    let BarChart_YAxis = d3.axisLeft(BarChart_Yscale)

    let BarChart_GS = BarChart_G.selectAll('rect').data(BarChart_DataSet).enter().append('g')

    // 坐标轴
    BarChart_G.append('g').attr("transform", "translate(" + 0 + "," + (BarChart_SvgHeight - margin.top - margin.bottom) + ")").call(
        BarChart_XAxis)
    BarChart_G.append('g').attr("transform", "translate(0,0)").call(BarChart_YAxis)

    // 绘制矩形  ， x,y为矩形左上角的点位置
    // let BarChart_RectPadding = 20
    // BarChart_GS.append('rect')
    //      .attr('x',(d,i)=>BarChart_Xscale(i)+BarChart_RectPadding/2)
    //      .attr('y',d=>BarChart_Yscale(d))
    //      .attr('width',()=>BarChart_Xscale.step()-BarChart_RectPadding)
    //      .attr('height',(d)=>BarChart_SvgHeight-margin.top-margin.bottom-BarChart_Yscale(d))
    //      .attr('fill',(d,i)=>i&1?'tomato':'skyblue')


    // 添加过渡动画   transition前为初始状态  后为结束状态
    let transTime = 30
    let BarChart_RectPadding = 20
    BarChart_GS.append('rect')
        .on('mouseover', function () {
            d3.select(this)
                .transition()
                .duration(1000)
                .attr('fill', 'gray')
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration(1500)
                .attr('fill', i & 1 ? 'tomato' : 'skyblue')
        })
        .attr('x', (d, i) => BarChart_Xscale(i) + BarChart_RectPadding / 2)
        .attr('y', d => BarChart_Yscale(BarChart_Yscale.domain()[0]))
        .attr('width', () => BarChart_Xscale.step() - BarChart_RectPadding)
        .attr('height', 0)
        .attr('fill', (d, i) => i & 1 ? 'tomato' : 'skyblue')
        .transition()
        .duration(1000)
        .delay((d, i) => i * transTime)
        //easeElasticInOut chrome浏览器会报错，但是不影响效果 可能是因为数据的顺序问题？？。数据点必须按升序排列  ease用法与d3 v3版本不同  
        // .ease(d3.easeElasticInOut)
        .ease(d3.easeBounceOut)
        .attr('y', d => BarChart_Yscale(d))
        .attr('height', (d) => BarChart_SvgHeight - margin.top - margin.bottom - BarChart_Yscale(d))


    // 绘制文字 其中dx,dy表示相对(x,y)平移的大小，所以文本会从(x+dx,y+dy)位置开始显示
    // BarChart_GS.append('text')
    //      .attr('x',(d,i)=>BarChart_Xscale(i)+BarChart_RectPadding/2)
    //      .attr('y',d=>BarChart_Yscale(d)-30)
    //      .attr('dx',()=>(BarChart_Xscale.step()-BarChart_RectPadding)/2)
    //      .attr('dy',20)
    //      .text(d=>d)
    //      .attr('fill','darkgray')
    BarChart_GS.append('text')
        .on('click', (data, index, arr) => {
            // 使用箭头函数得从arr里取当前元素
            console.log(getComputedStyle(arr[index]).color)
            console.log(arr[index].getAttribute('fill'))
            d3.select(arr[index])
                .transition()
                .duration(1000)
                .attr('fill', function () {
                    return d3.select(this).attr('fill') == 'rgb(240, 128, 128)' ? 'darkgray' : 'lightcoral'
                })
            d3.select('body')
                .append('span')
                .text(`值为：${data}`)
                .attr('class', 'tips')
                .attr('style', `left:${d3.event.pageX-22}px;top:${d3.event.pageY-53}px;`)

            // transform坐标系统有问题
            // .attr('transform','scale(1.5,1.5)')  
            console.log(d3.event)
        })
        .attr('x', (d, i) => BarChart_Xscale(i) + BarChart_RectPadding / 2)
        .attr('y', d => BarChart_Yscale(BarChart_Yscale.domain()[0]) - 30)
        .attr('dx', () => (BarChart_Xscale.step() - BarChart_RectPadding) / 2)
        .attr('dy', 20)
        .text(d => d)
        .attr('fill', 'darkgray')
        .transition()
        .duration(1000)
        .delay((d, i) => i * transTime)
        .attr('y', d => BarChart_Yscale(d) - 30)