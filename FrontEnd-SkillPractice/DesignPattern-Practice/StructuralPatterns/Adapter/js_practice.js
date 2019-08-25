// 电源适配器器使笔记本电脑在 100V~240V 的电压之内都能正常工作
// XML-JSON 的适配器
// PS2-USB适配器
// 外观模式 ：同一套API (适配)  操作不同的数据库
// 外观模式主要是为子系统中的一组接口提供一个一致的界面，
// 外观模式定义了一个高层接口，这个接口使子系统更加容易使用

// 适配器模式是一对相对简单的模式。在本书提到的设计模式中，有一些模式跟适配器模式的
// 结构非常相似，比如装饰者模式、代理模式和外观模式。这几种模式都属于“包装模式”，
// 都是由一个对象来包装另一个对象。区别它们的关键仍然是模式的意图。

var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};
var baiduMap = {
    display: function () {
        console.log('开始渲染百度地图');
    }
};
var baiduMapAdapter = {
    show: function () {
        return baiduMap.display();
    }
};

var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};
renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(baiduMapAdapter); // 输出：开始渲染百度地图