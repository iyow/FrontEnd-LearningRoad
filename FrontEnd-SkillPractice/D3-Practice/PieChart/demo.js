// 饼状图
let pie_Svg = d3.select('body').append('svg').attr('width', 400).attr('height', 400)
let pie_SvgWidth = pie_Svg.attr('width')
let pie_SvgHeight = pie_Svg.attr('height')
let pie_G = pie_Svg.append('g')


let pie_DataSet = [30, 10, 43, 55, 13]
// 可直接对数据排序改变布局
// pie_DataSet.sort((a,b)=>b-a)

// 颜色 比例尺  d3.schemeCategory10表示一些离散的色彩
let pie_colorScale = d3.scaleOrdinal().domain(d3.range(pie_DataSet.length)).range(d3.schemeCategory10)

// 新建 饼状图  生成画弧数据
// 定义饼图布局***
let pie = d3.pie().sort(null)
let pie_Data = pie(pie_DataSet)

// 新建 弧形生成器(内外圆环)
// arc({
//     innnerRadius:0,
//     outerRadius:100,
//     startAngle:0,
//     endAngle:Math.PI/2
// })
let arc_innerRadius = 0
let arc_outerRadius = 150

let arc_generator = d3.arc()
    .innerRadius(arc_innerRadius)
    .outerRadius(arc_outerRadius)

let arc_generatorBigger = d3.arc()
    .innerRadius(arc_innerRadius)
    .outerRadius(arc_outerRadius + 5)


// 添加制作动画相关属性
let sum = 0
pie_Data.forEach(d => {
    console.log(d)
    // 此处得先计算出重心位置否则字体会以改变后的startAngle和endAngle为基础计算位置会出错
    d.center = arc_generator.centroid(d)

    d._endAngle = d.endAngle
    d.endAngle = d.startAngle
    // 动画时长2秒，计算每一个弧形所用动画时间
    d.duration = 2000 * (d.data / d3.sum(pie_DataSet))
    // 每个弧形延时
    d.delayTime = sum
    sum = sum + d.duration
});

// 每个扇形内容 建立分组
let pie_GS = pie_G.selectAll('g')
    .data(pie_Data).enter()
    .append('g').attr("transform", `translate(${pie_SvgWidth/2},${pie_SvgHeight/2})`)

// 绘制扇形  path
pie_GS.append('path')
    .attr('fill', (d, i) => pie_colorScale(i))
    .attr('d', d => arc_generator(d))
    .transition()
    .delay((d) => d.delayTime)
    .duration((d, i) => d.duration)
    .ease(d3.easeLinear)
    .attrTween('d', function (d, i) {
        let obj = {
            startAngle: d.startAngle,
            endAngle: d._endAngle
        }
        let inter = d3.interpolate(d, obj)
        //obj保存转换之后的信息
        //插值模式，从d.endAnle=d.startAngle到d.endAngle=d._endAngle转换
        return function (t) {
            //   d.endAngle = inter(t)
            return arc_generator(inter(t))
        }
    })

// 绘制文字
// arc.centroid  计算弧形质心(重心点).修改为提前计算
pie_GS.append('text')
    .transition()
    .delay((d) => d.delayTime)
    .duration((d, i) => d.duration)
    .ease(d3.easeLinear)
    .attr('transform', (d, i) => `translate(${d.center})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data)
    .attr('fill', 'white')

