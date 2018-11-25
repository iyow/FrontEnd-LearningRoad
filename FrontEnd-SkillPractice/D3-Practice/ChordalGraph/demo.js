// 弦图
// 弦图主要用于表现多个节点间的联系，两节点间的连线表示这两个节点有联系，线的粗细代表权重


// 五大洲人口组成数据
let continent = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']
// 模拟矩阵
let matrix = [
  [11975, 5871, 8916, 2868, 3241],
  [1951, 10048, 2060, 6171, 1323],
  [8010, 16145, 8090, 8045, 4456],
  [1013, 990, 940, 6907, 3245],
  [2344, 2333, 940, 3654, 7526]
]
let ChordGraph_Width = 400
let ChordGraph_Height = 400
      let ChordGraph_Svg = d3.select('body')
        .append('svg')
        .attr('width', ChordGraph_Width)
        .attr('height', ChordGraph_Height)
      let chord = d3.chord()
        .padAngle(0.03)
        .sortSubgroups(d3.ascending)

      // chord(matrix)的返回值
      // (15)[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, groups: Array(5)]
      
      // 获取节点,也就是最后那个group
      let ChordGraph_nodes = chord(matrix)['groups']
      // 获取弦,需要剔除最后的那个group
      let arcs = chord(matrix).map((item) => {
        return item
      })
      let ChordGraph_color = d3.scaleOrdinal(d3.schemeCategory10)
      // 添加g元素确定弦图的中心
      let gChord = ChordGraph_Svg.append('g')
        .attr('transform', 'translate(' + ChordGraph_Width / 2 + ',' + ChordGraph_Height / 2 + ')')
      // 添加一个装节点的g
      let gOuter = gChord.append('g')
        .attr('class', 'groups')
        .selectAll('g')
        .data(ChordGraph_nodes)
        .enter().append('g')
      // 绘制弧
      let innerRadius = ChordGraph_Width / 2 * 0.7
      let outerRadius = innerRadius * 1.1
      let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
      gOuter.append('path')
        .attr('class', 'outerPath')
        .style('fill', function (d) { return ChordGraph_color(d.index) })
        // .style('stroke', function (d) { return d3.rgb(ChordGraph_color(d.index)).darker() })
        .attr('d', arc)
      // 节点文字绘制
      gOuter.selectAll('.outerText')
        .data(ChordGraph_nodes)
        .enter()
        .append('text')
        .each(function (d, i) { // 为绑定的数据添加变量
          d.angle = (d.startAngle + d.endAngle) / 2 // 弧的中心角度
          d.name = continent[i]
        })
        .attr('class', 'outerText')
        .attr('dy', '.35em')
        .attr('transform', function (d) {
          let result = 'rotate(' + (d.angle * 180) / Math.PI + ')' // 旋转
          result += 'translate(-15,' + -1.0 * (outerRadius + 10) + ')' // 平移
          // 对下方文字做旋转180度处理
          if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) {
            result += 'rotate(180)'
          }
          return result
        })
        .text(function (d) {
          return d.name
        })
      // 添加内部的弦
      let ribbon = d3.ribbon()
        .radius(innerRadius)
      gChord.append('g')
        .selectAll('path')
        .data(arcs)
        .enter().append('path')
        .attr('class', 'innerPath')
        .attr('d', ribbon)
        .style('fill', function (d) { return ChordGraph_color(d.target.index) })
        .style('stroke', function (d) { return d3.rgb(ChordGraph_color(d.target.index)).darker() })

      // 添加鼠标移入动画
    //   只显示与该外弦相关内弦
      gOuter.selectAll('.outerPath')
        .on('mouseover', function (data) {
          let i = data.index
          ChordGraph_Svg.selectAll('.innerPath')
            .filter(function (d) {
              return d.source.index !== i && d.target.index !== i
            })
            .transition()
            .duration(500)
            .style('opacity', 0)
        })
        .on('mouseout', function (data) {
          let i = data.index
          ChordGraph_Svg.selectAll('.innerPath')
            .filter(function (d) {
              return d.source.index !== i && d.target.index !== i
            })
            .transition()
            .duration(500)
            .style('opacity', 1)
        })