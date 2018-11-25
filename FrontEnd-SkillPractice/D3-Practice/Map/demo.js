// 中国地图
let Chinamap_Svg = d3.select('body').append('svg').attr('width', 1200).attr('height', 800)
let Chinamap_Width = Chinamap_Svg.attr('width')
let Chinamap_Height = Chinamap_Svg.attr('height')
let Chinamap_G = Chinamap_Svg.append('g')

// 投影函数
// 将 JSON 的格式应用于地理上的文件，叫做 GeoJSON 文件
// 由于 GeoJSON 文件中的地图数据，都是经度和纬度的信息。
// 它们都是三维的，而要在网页上显示的是二维的，所以要设定一个投影函数来转换经度纬度。
// 此处使用的是   墨卡托投影
// （优点：精准还原各国家国土形状且所有地方北边朝上）
// （缺点：以牺牲对各国领土面积大小的准确反映，纬度越高变形越严重）
let Chinamap_projection = d3.geoMercator()
    .center([107, 31])
    .scale(950)
    .translate([Chinamap_Width / 2, Chinamap_Height / 2 + Chinamap_Height / 6])

// 创建地理路径 生成器
let Chinamap_path = d3.geoPath()
    .projection(Chinamap_projection)


// 获取地图数据
// d3.json Fetch Api之上的便捷方法
d3.json('./AllData/china.json').then((mapdata) => {
    console.log(mapdata)
    let colorScale = d3.scaleOrdinal()
        .domain(d3.range(mapdata.features.length))
        .range(d3.schemePaired);
    // 绘制每个省份
    Chinamap_G.attr('class', 'states')
        .selectAll('path')
        .data(mapdata.features)
        .enter()
        .append('path')
        .attr('d', Chinamap_path)
        // .on('mouseover', function (d, i) {
        //     d3.select(this)
        //       .attr('fill', 'white')
        //     // 是否选择鼠标移入显示省份
        //     Chinamap_Svg
        //       .append('text')
        //       .attr('x', () => Chinamap_projection(d.properties.cp)[0])
        //       .attr('y', () => Chinamap_projection(d.properties.cp)[1])
        //       .attr('dx', () => -d.properties.name.length / 2 + 'em')
        //       .attr('dy', '-0.5em')
        //       .style('font-size', '12px')
        //       .attr('class', 'label')
        //       .text(() => d.properties.name)
        //   })
        //   .on('mouseout', function (d, i) {
        //     d3.select(this)
        //       .attr('fill', color(i))
        //     d3.selectAll('.label').remove()
        //   })
        .attr('stroke', '#666')
        .attr("stroke-width", 1)
        .attr('fill', (d, i) => colorScale(i))
        .append('title')   // 设置title鼠标移入也可显示text的内容
        .text(d => d.properties.name)


    // 显示所有省份
    // let textContainer = Chinamap_Svg.selectAll('.texts')
    // .data(mapdata.features)
    // .enter()
    // .append('g')
    // .attr('class', 'texts')
    // textContainer.append('text')
    //     .attr('x', (d) => Chinamap_projection(d.properties.cp)[0])
    //     .attr('y', (d) => Chinamap_projection(d.properties.cp)[1])
    //     .attr('dx', (d) => -d.properties.name.length / 2 + 'em')
    //     .attr('dy', '0.5em')
    //     .style('font-size', '11px')
    //     .text((d) => d.properties.name)

    // 描边叠加
    // Chinamap_Svg.selectAll('.outerpath')
    //             .data(mapdata.features)
    //             .enter()
    //             .append('path')
    //             .attr("class", "state-borders")
    //             .attr('d',d=>Chinamap_path(d))
})