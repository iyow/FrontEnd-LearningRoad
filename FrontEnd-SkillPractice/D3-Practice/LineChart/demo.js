// 折线图

let lineData = [10, 30, 25, 12, 43, 25, 18, 36]

let LineChart_Width = 400
let LineChart_Height = 400
// 初始化LineChart_Svg画布
let LineChart_Svg = d3.select('body')
  .append('svg')
  .attr('width', LineChart_Width)
  .attr('height', LineChart_Height)

// 比例尺
let LineChart_xScale = d3.scaleBand().domain(['1月', '2月', '3月', '4月', '5月', '6月']).range([0, LineChart_Width - margin.left - margin.right])
let LineChart_yScale = d3.scaleLinear().domain([d3.min(lineData) - 5, d3.max(lineData) + 5]).range([LineChart_Height - margin.top - margin.bottom, 0]) // 值域取反
let LineChart_xAxis = d3.axisBottom().scale(LineChart_xScale)
let LineChart_yAxis = d3.axisLeft(LineChart_yScale)
// 添加x轴
LineChart_Svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + (LineChart_Height - margin.bottom) + ')')
  .call(LineChart_xAxis)
// 添加y轴
LineChart_Svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .call(LineChart_yAxis)
// 设置折线
let line = d3.line()
  .x((d, i)=> {
    return margin.left + (LineChart_Width - margin.left - margin.right) / lineData.length * (i + 0.5)
  })
  .y((d, i)=> {
    return LineChart_yScale(d)
  })
  .curve(d3.curveBasis)
// 绘制折现路径
LineChart_Svg.append('path')
  .attr('d', line(lineData))
  .attr('stroke', 'red')
  .attr('stroke-width', '4px')
  .attr('fill', 'none')
  .attr('class', 'line') // 添加动画