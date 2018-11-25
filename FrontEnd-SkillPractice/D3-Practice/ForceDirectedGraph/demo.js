
// 力导向图
let FD_Svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600)
let FD_Width = FD_Svg.attr('width')
let FD_height = FD_Svg.attr('height')
let FD_G = FD_Svg.append('g')
    .attr("transform", `translate(${margin.top},${margin.left})`)


//准备数据

//节点集
var nodes = [{
        name: "湖南邵阳"
    },
    {
        name: "山东莱州"
    },
    {
        name: "广东阳江"
    },
    {
        name: "山东枣庄"
    },
    {
        name: "泽"
    },
    {
        name: "恒"
    },
    {
        name: "鑫"
    },
    {
        name: "明山"
    },
    {
        name: "班长"
    }
]

//边集
var edges = [{
        source: 0,
        target: 4,
        relation: "籍贯",
        value: 1.3
    },
    {
        source: 4,
        target: 5,
        relation: "舍友",
        value: 1
    },
    {
        source: 4,
        target: 6,
        relation: "舍友",
        value: 1
    },
    {
        source: 4,
        target: 7,
        relation: "舍友",
        value: 1
    },
    {
        source: 1,
        target: 6,
        relation: "籍贯",
        value: 2
    },
    {
        source: 2,
        target: 5,
        relation: "籍贯",
        value: 0.9
    },
    {
        source: 3,
        target: 7,
        relation: "籍贯",
        value: 1
    },
    {
        source: 5,
        target: 6,
        relation: "同学",
        value: 1.6
    },
    {
        source: 6,
        target: 7,
        relation: "朋友",
        value: 0.7
    },
    {
        source: 6,
        target: 8,
        relation: "职责",
        value: 2
    }
]

// 颜色比例尺
var FD_colorScale = d3.scaleOrdinal()
    .domain(d3.range(nodes.length))
    .range(d3.schemeCategory10)
// 新建力导向图
let forceSimulation = d3.forceSimulation()
    .force('link', d3.forceLink())
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter())

// 生成节点数据
forceSimulation.nodes(nodes)
    .on('tick', ticked)

// 生成边集数据
forceSimulation.force('link')
    .links(edges)
    // 每条边权值。。。映射为长度展示
    .distance(d => d.value * 100)

console.log(nodes)
console.log(edges)

// 设置图形中心位置
forceSimulation.force('center')
    .x(FD_Width / 2)
    .y(FD_height / 2)



// 绘制边
// 应该先绘制边，在绘制顶点，因为在d3中，各元素是有层级关系的，先绘制的在下面

let links = FD_G.append('g')
    .selectAll('line')
    .data(edges)
    .enter()
    .append('line')
    .attr('stroke', (d, i) => FD_colorScale(i))
    .attr('stroke-width', 1)


// 边上的文字
let linksText = FD_G.append('g')
    .selectAll('text')
    .data(edges)
    .enter()
    .append('text')
    .text(d => d.relation)

// 绘制节点集    先建立包裹   节点及文字的分组   g
// selectAll('.nodesGS') 选中该G节点  作为插入点  
let nodesGS = FD_G.selectAll('.nodesGS').data(nodes).enter().append('g')
    .attr('trnasform', d => `translate(${d.x},${d.y})`)
    .call(d3.drag().on('start', started).on('drag', dragged).on('end', ended))

// 节点
nodesGS.append('circle')
    .attr('r', 10)
    .attr('fill', (d, i) => FD_colorScale(i))

// 文字
nodesGS.append('text')
    .attr('x', -10)
    .attr('y', -20)
    .attr('dy', 10)
    .text(d => d.name)


// 工具函数

// 这个函数对于力导向图来说非常重要，因为力导向图是不断运动的，每一时刻都在发生更新，所以需要不断更新节点和连线的位置
function ticked(d) {
    links
        .attr("x1", function (d) {
            return d.source.x;
        })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });

    linksText
        .attr("x", function (d) {
            return (d.source.x + d.target.x) / 2;
        })
        .attr("y", function (d) {
            return (d.source.y + d.target.y) / 2;
        });

    nodesGS.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}

function started(d) {
    if (!d3.event.active) {
        // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
        forceSimulation.alphaTarget(0.8).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
}
// 如果不添加 end 事件  节点将会固定到最后鼠标拖动位置  
function ended(d) {
    if (!d3.event.active) {
        forceSimulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}


