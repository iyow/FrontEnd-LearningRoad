// 矩阵树图

// 相比于区域分布(分区图)，矩阵树图多个了纬度叫做权重，括号里的数值就是权重，权重越大，占的区域越大。

const MTD_Width = 400
const MTD_Height = 400
const MTD_treeData = {
'name': '中国',
'children': [
    {
    'name': '浙江',
    'children':
    [
        {'name': '杭州', 'gdp': 1234},
        {'name': '宁波', 'gdp': 3334},
        {'name': '温州', 'gdp': 2000},
        {'name': '绍兴', 'gdp': 1002}
    ]
    },
    {
    'name': '广西',
    'children': [
        {
        'name': '桂林',
        'children':
        [
            {'name': '秀峰区', 'gdp': 2131},
            {'name': '叠彩区', 'gdp': 2015},
            {'name': '象山区', 'gdp': 988},
            {'name': '七星区', 'gdp': 756}
        ]
        },
        {'name': '南宁', 'gdp': 3699},
        {'name': '柳州', 'gdp': 4511},
        {'name': '防城港', 'gdp': 2325}
    ]
    },
    {
    'name': '黑龙江',
    'children': [
        {'name': '哈尔滨', 'gdp': 784},
        {'name': '齐齐哈尔', 'gdp': 885},
        {'name': '牡丹江', 'gdp': 1254},
        {'name': '大庆', 'gdp': 3240}
    ]
    },
    {
    'name': '新疆',
    'children':
        [
        {'name': '乌鲁木齐', 'gdp': 2456},
        {'name': '克拉玛依', 'gdp': 1015},
        {'name': '吐鲁番', 'gdp': 998},
        {'name': '哈密', 'gdp': 654}
        ]
    }
]
}
      const MTD_color = d3.scaleOrdinal(d3.schemeCategory10)
      // 数据转化
      const MTD_treemap = d3.treemap().size([MTD_Width, MTD_Height])
      const MTD_root = d3.hierarchy(MTD_treeData).sum((d) => d.gdp)
      const MTD_tree = MTD_treemap(MTD_root) // 获取MTD_treemap结构树
      const MTD_leaves = MTD_tree.leaves() // 将生成的树形结构转化成叶子节点数组
      // 用叶子节点数组绘图
      const MTD_Svg = d3.select('body')
        .append('svg')
        .attr('width', MTD_Width)
        .attr('height', MTD_Height)
      const MTD_G = MTD_Svg.selectAll('.rects')
        .data(MTD_leaves)
        .enter()
        .append('g')
        .attr('class', 'rects')
      // 添加矩阵
      MTD_G.append('rect')
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => (d.x1 - d.x0))
        .attr('height', (d) => (d.y1 - d.y0))
        .style('fill', (d) => MTD_color(d.parent.data.name))
        .style('stroke', '#cccccc')
      // 添加描述
      MTD_G.append('text')
        .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
        .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
        .attr('dx', (d) => { return -d.data.name.length / 2 + 'em' })
        .attr('dy', (d) => { return '-0.5em' })
        .text((d) => { return d.data.name })
        .attr('font-size', (d) => { return 14 - d.depth + 'px' })
        .attr('fill', '#f0f0f0')
      MTD_G.append('text')
        .attr('x', (d) => (d.x1 - d.x0) / 2 + d.x0)
        .attr('y', (d) => (d.y1 - d.y0) / 2 + d.y0)
        .attr('dx', (d) => { return -(d.value.toString().length + 2) / 4 + 'em' })
        .attr('dy', (d) => { return '1em' })
        .text((d) => { return '(' + d.value + ')' })
        .attr('font-size', (d) => { return 14 - d.depth + 'px' })
        .attr('fill', '#ffffff')