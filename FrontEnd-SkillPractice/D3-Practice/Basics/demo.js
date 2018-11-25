
// 基本操作，绑定数据
let p = d3.selectAll("body p")
let arr = ['pig', 'apple', 'cat', 'asd', 'uuuuu']
let map = new Map([
    ['kk', 1],
    ['ll', 2]
])
let set = new Set([1, 2])
let obj = {
    k: 1234,
    l: 1234567
}
let str2 = 'asdasdd'

// p.data(str)
let bindData = p.data(arr)
console.log(p)
console.log(bindData)
console.log(bindData.enter())
bindData.html((data, index) => {
    return `第${index}元素的是${data}`
})



// SVG 简单图标
let margin = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 60
}
let barDateSet = [250, 210, 170, 130, 90]
let rectHeight = 30

d3.select('body').append('svg').attr('width', 500).attr('height', 400)
    .attr('transform',`translate(${margin.left},${margin.top})`).style('background-color', 'transparent')
    .append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    .selectAll('rect').data(barDateSet).enter().append('rect')
    .attr('x', 20).attr('y', function (data, index) {
        return index * rectHeight
    })
    .attr('width', d => d).attr('height', rectHeight - 10)
    .attr('fill', (d, i) => i & 1 ? 'lightcoral' : 'skyblue')


//   比例尺的使用
// 线性比例尺
const Body = d3.select('body')
let d3AppendDiv = () => Body.append('div')
let scaleLinearDomain = [1.2, 2.3, 0.9, 1.5, 3.3]
let scaleLinearRange = [0, 300]
// let max = d3.max(scaleLinearDomain)
// let max = d3.min(scaleLinearDomain)
let slMax = Math.max.apply(null, scaleLinearDomain)
let slMin = Math.min(...scaleLinearDomain)

let scaleLinear = d3.scaleLinear().domain([slMin, slMax]).range(scaleLinearRange)

d3.select('body').append('div').text(scaleLinear(0))
d3.select('body').append('div').text('比例尺最小映射--------' + scaleLinear(0.9)) // min
d3.select('body').append('div').text(scaleLinear(1))
d3.select('body').append('div').text(scaleLinear(2))
d3.select('body').append('div').text('比例尺最大映射--------' + scaleLinear(3.3)) // max
d3.select('body').append('div').text(scaleLinear(4))

// 序数比例尺   domain   range 都为离散的   例如数组每个元素

let sacleOrdinalDomain = [4, 3, 2, 1, 0]
let sacleOrdinalRange = ['yellow', 'blue', 'green', 'black', 'red', 'hacke']

let scaleOrdinal = d3.scaleOrdinal().domain(sacleOrdinalDomain).range(sacleOrdinalRange)

d3AppendDiv().text(scaleOrdinal(0))
d3AppendDiv().text(scaleOrdinal(1))
d3AppendDiv().text(scaleOrdinal(2))
d3AppendDiv().text(scaleOrdinal(3))
d3AppendDiv().text(scaleOrdinal(4))
d3AppendDiv().text(scaleOrdinal(5))
d3AppendDiv().text(scaleOrdinal(8))
d3AppendDiv().text(scaleOrdinal(9))
d3AppendDiv().text(scaleOrdinal(10))
d3AppendDiv().text('-------------------' + scaleOrdinal(9))

// 使用比例尺建立图标
let useScaleLinear = d3.scaleLinear().domain([0, Math.max(...barDateSet)]).range([0, 300])

let xAxis = d3.axisBottom(useScaleLinear)
    .ticks(7) //设置刻度数目...不太理解

let GG = d3.select('body').append('svg').attr('width', 500).attr('height', 400)
    .append('g')
GG.selectAll('rect').data(barDateSet).enter().append('rect')
    .attr('x', 20).attr('y', (data, index) => index * rectHeight)
    .attr('width', d => useScaleLinear(d)).attr('height', rectHeight - 10)
    .attr('fill', (d, i) => i & 1 ? 'lightseagreen' : 'lightslategray')

GG.append('g').attr("transform", "translate(" + 20 + "," + (barDateSet.length * rectHeight) + ")")
    .call(xAxis)

