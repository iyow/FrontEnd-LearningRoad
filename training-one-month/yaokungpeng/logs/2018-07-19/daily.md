# 2018-07-19 日报

> MOCK数据

---

## 事宜
- [x] Nuxt实现专题页中的分类仍是不刷新页面切换，但课程详情页重新开页面渲染
- [ ] mock.js模拟文章数据

## 问题及解决
- Mock数据两种思路
    - 在client端处数据mock：该方式拦截了请求的发出，直接返回mock的数据
    - 在server端mock：该方式请求真实地发出，只是在server端进行route拦截
- Mock数据的几种方式
    - 将mock数据直接写在代码里，设置定时器函数返回
    - 利用js拦截请求，例如使用Mock.js模拟ajax请求，生成并模拟Mock数据
    - 利用Charles和Fiddler等代理工具拦截请求
    - 使用Easy Mock,RAP等工具管理团队内多个项目的Mock数据
- vscode 添加代码片段减少重复工作 (感谢连飞老师)