
## 2. webpack Loader编写
> loader是webpack的核心概念之一，它的基本工作流是将一个文件以字符串的形式读入，对其进行语法分析及转换（或者直接在loader中引入现成的编译工具，例如sass-loader中就引入了node-sass将SCSS代码转换为CSS代码，再交由css-loader处理），然后交由下一环节进行处理，所有载入的模块最终都会经过moduleFactory处理，转成javascript可以识别和运行的代码，从而完成模块的集成。到webpack的官方网站浏览一下[Guide](https://webpack.js.org/contribute/writing-a-loader/)和[loader的API](https://webpack.js.org/api/loaders/)

### 构建流程
- 全局安装webpack及cli

- npm init 

- 新建 入口文件  main.js  加载需要loader处理的以tpl.html为后缀文件

- 新建 需要加载的文件 hah.tpl.html

- 配置 webpack.config ,package.json 配置script运行脚本

- 编写loader，将loader配置到webpack.config中

- 打包。验证。测试。发布。

