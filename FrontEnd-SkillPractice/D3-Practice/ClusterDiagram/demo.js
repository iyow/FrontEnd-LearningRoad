// 集群图本身和树状图差不多，和树状图不同的是，
// 集群图的所有叶子节点（每个分支深度最深的节点）都放在统一深度的位置上，因此可以利用这个特性做一个圆


let Cluster_treeData =  {
    'name':'中国', 
    'children':[ {
        'name':'浙江', 
        'children':
        [ {'name':'杭州'},  {'name':'宁波'},  {'name':'温州'},  {'name':'绍兴'}
        ]
      },  {
        'name':'广西', 
        'children':[ {
            'name':'桂林', 
            'children':
            [ {'name':'秀峰区'},  {'name':'叠彩区'},  {'name':'象山区'},  {'name':'七星区'}
            ]
          },  {'name':'南宁'},  {'name':'柳州'},  {'name':'防城港'}
        ]
      },  {
        'name':'黑龙江', 
        'children':[ {'name':'哈尔滨'},  {'name':'齐齐哈尔'},  {'name':'牡丹江'},  {'name':'大庆'}
        ]
      },  {
        'name':'新疆', 
        'children':
          [ {'name':'乌鲁木齐'},  {'name':'克拉玛依'},  {'name':'吐鲁番'},  {'name':'哈密'}
          ]
      }
    ]
}

      let Cluster_Width = 400
      let Cluster_Height = 400
      let svg = d3.select('body')
        .append('svg')
        .attr('width', Cluster_Width)
        .attr('height', Cluster_Height)
      // 初始化树状图数据获取器
      let cluster = d3.cluster()
        .size([Cluster_Width, Cluster_Height - 80])
        .separation(function (a, b) {
          return (a.parent === b.parent ? 1 : 2) / a.depth
        })
      // 初始化json数据转成一棵树，这个步骤是非常必要的！！
      let hierarchyData = d3.hierarchy(Cluster_treeData)
        .sum(function (d) {
          return d.value
        })
      // 初始化树状图
      let Cluster_tree = cluster(hierarchyData)
      // 获取节点
      let Cluster_nodes = Cluster_tree.descendants()
      // 获取边,也就是连线
      let Cluster_links = Cluster_tree.links()
      // 绘制线
      let Cluster_G = svg.append('g').attr('transform', 'translate(' + Cluster_Width / 2 + ',' + Cluster_Height / 2 + ')')
      Cluster_G.selectAll('.link')
        .data(Cluster_links)
        .enter().append('path')
        .style('fill', '#cccccc')
        // 根据官网API 返回 d.x 和 d.y绘制出来的线就是一坨shit,猜了一个小时终于猜出来了
        .attr('d', d3.linkRadial()
          .angle(function (d) { return d.x / 180 * Math.PI })
          .radius(function (d) { return d.y / 2 }))
      // 绘制文本和节点
      Cluster_G.selectAll('.node')
        .data(Cluster_nodes)
        .enter().append('g')
        // 生成class便于后续选择与添加样式  node node--[internal|leaf]
        .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf') })
        .attr('transform', function (d) { return 'rotate(' + (d.x - 90) + ')translate(' + d.y / 2 + ')' })
      Cluster_G.selectAll('.node').append('circle')
        .attr('r', 5)
        .style('fill', 'green')
      Cluster_G.selectAll('.node').append('text')
        .attr('dx', function (d) { return d.x < 180 ? 8 : -8 })
        .attr('dy', '.31em')
        .attr('text-anchor', function (d) { return d.x < 180 ? 'start' : 'end' })
        .attr('transform', function (d) { return d.x < 180 ? null : 'rotate(180)' })
        .text(function (d) { return d.data.name })
        .style('font-size', '11px')