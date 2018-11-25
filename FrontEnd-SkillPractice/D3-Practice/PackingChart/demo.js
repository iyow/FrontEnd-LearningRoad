// 打包图

let Packing_Width = 400
let Packing_Height = 400
let Packing_Data = {
'name': '中国',
'value': '800',
'children': [
    {
    'name': '浙江',
    'value': '450',
    'children':
    [
        {'name': '杭州', 'value': '40'},
        {'name': '宁波', 'value': '30'},
        {'name': '温州', 'value': '20'},
        {'name': '绍兴', 'value': '20'}
    ]
    },
    {
    'name': '广西',
    'value': '200',
    'children': [
        {
        'name': '桂林',
        'value': '100',
        'children':
        [
            {'name': '秀峰区', 'value': '10'},
            {'name': '叠彩区', 'value': '30'},
            {'name': '象山区', 'value': '20'},
            {'name': '七星区', 'value': '10'}
        ]
        },
        {'name': '南宁', 'value': '30'},
        {'name': '柳州', 'value': '10'},
        {'name': '防城港', 'value': '10'}
    ]
    },
    {
    'name': '黑龙江',
    'value': '200',
    'children': [
        {'name': '哈尔滨', 'value': '50'},
        {'name': '齐齐哈尔', 'value': '40'},
        {'name': '牡丹江', 'value': '10'},
        {'name': '大庆', 'value': '30'}
    ]
    },
    {
    'name': '新疆',
    'value': '100',
    'children':
        [
        {'name': '乌鲁木齐', 'value': '40'},
        {'name': '克拉玛依', 'value': '20'},
        {'name': '吐鲁番', 'value': '10'},
        {'name': '哈密', 'value': '10'}
        ]
    }
]
}
      var Packing_color = d3.scaleSequential(d3.interpolateMagma)
        .domain([-4, 4])
      let Packing_Svg = d3.select('body')
        .append('svg')
        .attr('width', Packing_Width)
        .attr('height', Packing_Height)
      var pack = d3.pack()
        .size([Packing_Width - 4, Packing_Height - 4])
        .padding(4)
      var Packing_root = d3.hierarchy(Packing_Data)
        .sum(function (d) { return d.value })
        .sort(function (a, b) { return b.value - a.value })
      let Packing_nodes = pack(Packing_root).descendants()
      // 画圆
      Packing_Svg.selectAll('circle')
        .data(Packing_nodes)
        .enter()
        .append('circle')
        .style('fill', function (d) { return Packing_color(d.depth) })
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
        .attr('r', function (d) { return d.r })
        .on('mouseover', function (d) {
          d3.event.target.style.stroke = 'yellow'
          Packing_Svg.append('text')
            .style('fill', 'black')
            .style('opacity', '0.5')
            .attr('class', 'hello')
            .attr('x', d3.event.offsetX + 20)
            .attr('y', d3.event.offsetY - 10)
            .text(d.data.name)
        })
        .on('mouseout', function (d) {
          Packing_Svg.selectAll('.hello').remove()
          d3.event.target.style.stroke = 'transparent'

        })
      // 文字
      Packing_Svg.selectAll('text')
        .data(Packing_nodes)
        .enter()
        .append('text')
        .style('fill', 'black')
        .style('fill-opacity', function (d) { return d.children ? 0 : 1 }) // 设置包含子节点的文字不显示
        .attr('x', function (d) { return d.x })
        .attr('y', function (d) { return d.y })
        .attr('dy', '.3em')
        .attr('dx', function (d) { return '-' + d.data.name.length / 2 + 'em' }) // 设置文字居中，通过dx 负文字个数的二分之一
        .text(function (d) { return d.data.name })
        .style('font-size', function (d) { return 12 - d.depth + 'px' })