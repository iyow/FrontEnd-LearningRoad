// 堆栈图

// 堆栈图可以用于三维数据的展示，x轴和y轴 是两个维度，新增了颜色维度，也就是三个维度，
// 堆栈图的好处是可以将数据堆叠起来，关于堆栈图的衍生(区域生产器绘制堆栈图)

let StackDiagram_Width = 400
let StackDiagram_Height = 400
let StackDiagram_margin = 10 // 控制堆栈图的间隙
let StackDiagram_Data = [
    {month: '2018-1-1', apples: 3840, bananas: 1920, cherries: 960, oranges: 300},
    {month: '2018-1-2', apples: 1600, bananas: 1440, cherries: 960, oranges: 400},
    {month: '2018-1-3', apples: 640, bananas: 960, cherries: 640, oranges: 200},
    {month: '2018-1-4', apples: 320, bananas: 480, cherries: 640, oranges: 500}
]
      // 数据转换器
      let stack = d3.stack()
        .keys(['apples', 'bananas', 'cherries', 'oranges'])
        .order(d3.stackOrderNone)// 使用原始数据的顺序不进行顺序调整
        .offset(d3.stackOffsetNone)
      let stackData = stack(StackDiagram_Data)
      let StackDiagram_colorZ = d3.scaleOrdinal(d3.schemeCategory10) // 这里color其实是第三维度，他代表水果种类
      // x比例尺
      let StackDiagram_xScale = d3.scaleBand()
        .range([0, StackDiagram_Width - margin.left - margin.right])
      // x值域，其实就是月份
      StackDiagram_xScale.domain(StackDiagram_Data.map((d) => d.month))
      let StackDiagram_yScale = d3.scaleLinear()
        .range([StackDiagram_Height - margin.top - margin.bottom, 0])
      // y值域，求的是转化后的数组的最后一个数组中的第二个元素的最大值，绕的我都有点晕，最大值怎么求可以自己写function
      StackDiagram_yScale.domain([0, d3.max(stackData[stackData.length - 1], (item) => item[1])])
 
      // x轴和y轴
      let StackDiagram_xAxis = d3.axisBottom().scale(StackDiagram_xScale)
      let StackDiagram_yAxis = d3.axisLeft(StackDiagram_yScale)
      // 绘图
      let StackDiagram_Svg = d3.select('body')
        .append('svg')
        .attr('width', StackDiagram_Width)
        .attr('height', StackDiagram_Height)
      // 添加x轴
      StackDiagram_Svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + margin.left + ',' + (StackDiagram_Height - margin.bottom) + ')')
        .call(StackDiagram_xAxis)
      // 添加y轴
      StackDiagram_Svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(StackDiagram_yAxis)
      // 将二维数组的第一维剥离，打散成n列
      let rectContainer = StackDiagram_Svg.selectAll('rectContainer')
        .data(stackData)
        .enter()
        .append('g')
        .attr('class', 'rectContainer')
        .attr('fill', (d, i) => { return StackDiagram_colorZ(d.key) })
      // 渲染每一列
      rectContainer.selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => { return StackDiagram_xScale(d.data.month) + margin.left + StackDiagram_margin / 2 })
        .attr('y', (d) => { return StackDiagram_yScale(d[1]) + margin.top })
        .attr('width', (d) => { return StackDiagram_xScale.bandwidth() - StackDiagram_margin })
        .attr('height', (d) => { return StackDiagram_Height - margin.top - margin.bottom - StackDiagram_yScale(d[1] - d[0]) })
        .attr('stroke', '#ccc')
 
      // 添加描述
      StackDiagram_Svg.selectAll('circle')
        .data(['apples', 'bananas', 'cherries', 'oranges'])
        .enter()
        .append('circle')
        .attr('cx', (d) => { return StackDiagram_Width - margin.right - 80 })
        .attr('cy', (d, i) => { return margin.top + 25 * i })
        .attr('r', '6')
        .attr('fill', (d) => { return StackDiagram_colorZ(d) })
      let texts = StackDiagram_Svg.selectAll('textContainer')
        .data(['apples', 'bananas', 'cherries', 'oranges'])
        .enter()
        .append('g')
        .attr('class', 'textContainer')
      texts.append('text')
        .attr('x', (d) => { return StackDiagram_Width - margin.right - 60 })
        .attr('y', (d, i) => { return margin.top + 25 * i })
        .attr('dy', '0.32em')
        .text((d) => d)
        .attr('fill', (d) => StackDiagram_colorZ(d))