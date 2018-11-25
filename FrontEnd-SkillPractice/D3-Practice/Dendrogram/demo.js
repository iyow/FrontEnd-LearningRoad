// 树状图
let Tree_Svg = d3.select('body').append('svg').attr('width', 960).attr('height', 600)
let Tree_Width = Tree_Svg.attr('width')
let Tree_Height = Tree_Svg.attr('height')

let Tree_G = Tree_Svg.append('g').attr('transform', `translate(${margin.left},0)`)

// let Tree_Scale = Tree_Svg.append('g')

// 数据需要 以 树的形式 存储
let Tree_DataSet = {
    name: "中国",
    children: [{
            name: "浙江",
            children: [{
                    name: "杭州",
                    value: 100
                },
                {
                    name: "宁波",
                    value: 100
                },
                {
                    name: "温州",
                    value: 100
                },
                {
                    name: "绍兴",
                    value: 100
                }
            ]
        },
        {
            name: "广西",
            children: [{
                    name: "桂林",
                    children: [{
                            name: "秀峰区",
                            value: 100
                        },
                        {
                            name: "叠彩区",
                            value: 100
                        },
                        {
                            name: "象山区",
                            value: 100
                        },
                        {
                            name: "七星区",
                            value: 100
                        }
                    ]
                },
                {
                    name: "南宁",
                    value: 100
                },
                {
                    name: "柳州",
                    value: 100
                },
                {
                    name: "防城港",
                    value: 100
                }
            ]
        },
        {
            name: "黑龙江",
            children: [{
                    name: "哈尔滨",
                    value: 100
                },
                {
                    name: "齐齐哈尔",
                    value: 100
                },
                {
                    name: "牡丹江",
                    value: 100
                },
                {
                    name: "大庆",
                    value: 100
                }
            ]
        },
        {
            name: "新疆",
            children: [{
                    name: "乌鲁木齐"
                },
                {
                    name: "克拉玛依"
                },
                {
                    name: "吐鲁番"
                },
                {
                    name: "哈密"
                }
            ]
        }
    ]
}

// 创建层级布局
// d3.hierarchy()，层级布局，需要和tree生成器一起使用，来得到绘制树所需要的节点数据和边数据
// d3.hierarchy().sum() ,后序遍历。
let Tree_hierarchyData = d3.hierarchy(Tree_DataSet)
    .sum((d) => d.value)
console.log(Tree_hierarchyData)


// 创建树状图
// d3.tree()，创建一个树状图生成器
// d3.tree().separation(),定义邻居节点的距离
let tree = d3.tree()
    .size([Tree_Width - 400, Tree_Height - 200])
    .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth))
console.log(tree)

// 初始化树状图数据
let Tree_Data = tree(Tree_hierarchyData)

// 使用转换完成的数据  得到边和节点
let Tree_nodes = Tree_Data.descendants()
let Tree_lines = Tree_Data.links()

console.log(Tree_nodes)
console.log(Tree_lines)

// 创建贝塞尔曲线生成器
// d3.linkHorizontal()，创建水平贝塞尔生成曲线生成器<====>垂直的（d3.linkVertical()）
// 点的x坐标和y坐标交换了位置，所有变成了水平的
let Bezier_curve_generator = d3.linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x)


// 绘制边
Tree_G.append('g')
    .selectAll('path')
    .data(Tree_lines)
    .enter()
    .append('path')
    .attr('d', (d, i) => {
        let start = {
            x: d.source.x,
            y: d.source.y
        }
        let end = {
            x: d.target.x,
            y: d.target.y
        }
        return Bezier_curve_generator({
            source: start,
            target: end
        })
    })
    .attr('fill', 'none')
    .attr('stroke', 'yellow')
    .attr('stroke-width', 1)

// 绘制分组 节点和文字的父节点 g
let Tree_GS = Tree_G.append('g').selectAll('g')
    .data(Tree_nodes)
    .enter()
    .append('g')
    // 此处平移位置需要注意
    .attr('transform', (d, i) => `translate(${d.y},${d.x})`)

// 绘制节点及文字
// 节点
Tree_GS.append('circle')
    .attr('r', 6)
    .attr('fill', 'white')
    .attr('stroke', 'blue')
    .attr('stroke-width', 1)
// 文字
Tree_GS.append('text')
    // 如果有子节点文字向前移动  叶子节点文字都在节点后 其他文字都在节点前方
    .attr('x', (d) => d.children ? -40 : 8)
    .attr('y', -5)
    .attr('dy', 10)
    .text(d => d.data.name)

