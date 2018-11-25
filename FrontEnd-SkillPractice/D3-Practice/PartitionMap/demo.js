// 分区图----普通

let PartitionMap_Width = 400
let PartitionMap_Height = 400
let PartitionMap_Data = {
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
// 公式
let partition = d3.partition()
  .size([PartitionMap_Width, PartitionMap_Height])
let color = d3.scaleOrdinal(d3.schemeCategory10)
// 数据转化,取所有节点的数组
let partitionData = partition(d3.hierarchy(PartitionMap_Data)).descendants()
// 绘图
let PartitionMap_Svg = d3.select('body')
  .append('svg')
  .attr('width', PartitionMap_Width)
  .attr('height', PartitionMap_Height)
let PartitionMap_G = PartitionMap_Svg.selectAll('g')
  .data(partitionData)
  .enter()
  .append('g')
PartitionMap_G.append('rect')
  .attr('x', function (d) { return d.x0 })
  .attr('y', function (d) { return d.y0 })
  .attr('width', function (d) { return d.x1 - d.x0 })
  .attr('height', function (d) { return d.y1 - d.y0 })
  .style('stroke', '#ccc')
  .style('fill', function (d) { return color(d.data.name) })
PartitionMap_G.append('text')
  .attr('x', function (d) { return d.x0 })
  .attr('y', function (d) { return d.y0 })
  .attr('dx', function (d) { return (d.x1 - d.x0) / 2 }) // 文字水平居中
  .attr('dy', function (d) { return (d.y1 - d.y0) / 2 - d.data.name.length / 2 * 12 }) // 文字垂直居中,有点瑕疵
  .attr('font-size', function (d) { return 12 - d.depth + 'px' }) // 文字按深度缩小
  .attr('writing-mode', 'tb') // 文字从上往下书写
  .text(function (d) { return d.data.name })