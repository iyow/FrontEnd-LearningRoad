// 分区图----圆形

let PartitionMapC_Width = 400
let PartitionMapC_Height = 400
let PartitionMapC_Data = {
'name': '中国',
'value': '950',
'children': [
    {
    'name': '浙江',
    'value': '450',
    'children':
    [
        {'name': '杭州', 'value': '150'},
        {'name': '宁波', 'value': '120'},
        {'name': '温州', 'value': '130'},
        {'name': '绍兴', 'value': '150'}
    ]
    },
    {
    'name': '广西',
    'value': '200',
    'children': [
        {'name': '桂林', 'value': '80'},
        {'name': '南宁', 'value': '50'},
        {'name': '柳州', 'value': '30'},
        {'name': '防城港', 'value': '40'}
    ]
    },
    {
    'name': '黑龙江',
    'value': '200',
    'children': [
        {'name': '哈尔滨', 'value': '50'},
        {'name': '齐齐哈尔', 'value': '40'},
        {'name': '牡丹江', 'value': '60'},
        {'name': '大庆', 'value': '50'}
    ]
    },
    {
    'name': '新疆',
    'value': '100',
    'children':
        [
        {'name': '乌鲁木齐', 'value': '30'},
        {'name': '克拉玛依', 'value': '20'},
        {'name': '吐鲁番', 'value': '25'},
        {'name': '哈密', 'value': '25'}
        ]
    }
]
}
      // 公式,注意size的参数
      let PartitionMapC_radius = 200
      let partitionC = d3.partition()
        .size([2 * Math.PI, PartitionMapC_radius * PartitionMapC_radius])
      let PartitionMapC_color = d3.scaleOrdinal(d3.schemeCategory10)
      // 数据转化,取所有节点的数组
      let partitionCData = partitionC(d3.hierarchy(PartitionMapC_Data)).descendants()
      // 创建弧生成器
      let PartitionMapC_arc = d3.arc()
        .innerRadius(function (d) { return Math.sqrt(d.y0) })
        .outerRadius(function (d) { return Math.sqrt(d.y1) })
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
      // 绘图
      let PartitionMapC_Svg = d3.select('body')
        .append('svg')
        .attr('width', PartitionMapC_Width)
        .attr('height', PartitionMapC_Height)
      let g = PartitionMapC_Svg.selectAll('g')
        .data(partitionCData)
        .enter()
        .append('g')
        .attr('transform', 'translate(200,200)')
      g.append('path')
        .attr('display', function (d) {
          return d.depth ? null : 'none'
        })// 是否绘制中心,留白好看一些
        .attr('d', PartitionMapC_arc)
        .style('stroke', '#ccc')
        .style('fill', function (d) { return PartitionMapC_color(d.data.name) })
      g.append('text')
        .attr('transform', function (d, i) {
          if (i !== 0) {
            let r = (d.x0 + d.x1) / 2
            let angle = Math.PI / 2
            r += r < Math.PI ? (angle - Math.PI) : angle
            r *= 180 / Math.PI
            return 'translate(' + PartitionMapC_arc.centroid(d) + ')' + 'rotate(' + r + ')'
          }
        })
        .text(function (d) { return d.data.name })
        .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
        .attr('dy', '.5em')
        .attr('dx', function (d) { return -d.data.name.length / 2 + 'em' }) // 文字居中