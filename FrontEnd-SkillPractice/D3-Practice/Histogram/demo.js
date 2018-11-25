// 直方图
// 直方图与柱状图区别
// 柱状图表示散列点的数值展示，比如某一个年龄的人有多少
// 直方图，表示的是某一区间的数据之和的量，比如某一年龄段的人有多少，这和某一个年龄的人有多少有本质区别。


let Histogram_Width = 400
let Histogram_Height = 400
      let Histogram_Data = d3.range(1000).map(d3.randomBates(10)) // 基于贝茨分布生成随机数，也不知道是个啥
      let xScale = d3.scaleLinear()
        .rangeRound([0, Histogram_Width]) // 设置输出范围并且四舍五入
      // 转换数据
      let histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(20))
      let bins = histogram(Histogram_Data)
      // y比例尺
      let Histogram_yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) { return d.length })]) // 比较的是数据的length值
        .range([Histogram_Height - margin.bottom - margin.top, 0]) // 这里要倒着写，因为坐标轴原点在左上角
      // 绘图
      let Histogram_Svg = d3.select('body')
        .append('svg')
        .attr('width', Histogram_Width)
        .attr('height', Histogram_Height)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      let bar = Histogram_Svg.selectAll('.bar')
        .data(bins)
        .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function (d) { return 'translate(' + xScale(d.x0) + ',' + Histogram_yScale(d.length) + ')' })
      bar.append('rect')
        .attr('x', 1)
        .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
        .attr('height', function (d) { return Histogram_Height - Histogram_yScale(d.length) - 100 }) // d.length记录了该区间的个数
        .attr('fill', 'steelblue')
 
      let formatCount = d3.format(',.0f')
      bar.append('text')
        .attr('dy', '.75em')
        .attr('y', 6)
        .attr('x', (xScale(bins[0].x1) - xScale(bins[0].x0)) / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(function (d) { return formatCount(d.length) })
 
      Histogram_Svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (Histogram_Height - 95) + ')')
        .call(d3.axisBottom(xScale))