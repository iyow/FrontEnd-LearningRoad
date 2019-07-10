## 1. 基本项目构建

### 搭建基础配置
- npm init 新建项目 参见 [package.json详情](https://docs.npmjs.com/creating-a-package-json-file)

- 安装并初始化 webpack (-D等同于--save-dev)
    ```
    npm i webpack webpack-cli webpack-dev-server -D
    ```
- 编写项目代码(mkdir src && cd ./src && touch index.js)

- 打包试试，回到packagejson所在目录，第一次执行有关于Webpack相关的命令,Webpack4增加了mode属性，用来表示不同的环境。mode模式具有development，production 和 none三个值，其默认值是production 。也就是说，在执行命令的时候，我们可以带上相应的mode属性的值，设置none来禁用任何默认行为.
    ```
    npx webpack src/index.js --output dist/bundle.js --mode none
    ```

- 打包文件简析,可以在打包文件第一行加个debug查看详细运行情况,可以看到打包后代码中webpack自行维护了一套模块管理/加载机制
    ```javascript
     (function(modules) { // webpackBootstrap
        var installedModules = {};
        function __webpack_require__(modulId){
            // 略... 判断是否缓存 ...
            // Create a new module (and put it into the cache)
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            // Execute the module function
            // 三个参数   第一个绑定this
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            // 略... 标记是否加载 ...
            // 返回值就是module.exports，所以webpack对于CommonJs规范是原生支持的。
            return module.exports;
        }
        // 略... 在__webpack_require__上暴露各类信息 管理各模块 ...
        // 省略段简要分析：webpack所做的处理相当于对模块增加了代理，
        // 如果被加载模块符合ES Harmony规范，则返回module['default']，
        // 否则返回module。这里的module泛指模块输出的对象。
        // Load entry module and return exports 赋入口模块id__webpack_require__.s = 0 传入 modulId = 0
        return __webpack_require__(__webpack_require__.s = 0);
    })([
        /* 0 */
        function(module, __webpack_exports__, __webpack_require__) {
            // source代码
        },
        /* 1 */
        function(module, __webpack_exports__, __webpack_require__) {
            // source代码
        },
    ])
    ```

- 运行我们的打包文件，dist下创建index.html文件并加载打包的文件, 在浏览器打开，或者安装http-server包在本地开启一个http静态资源服务器
    ```
    // 此处为全局安装，也可以安装在项目中使用 npx http-server dist运行
    npm i -g http-server 
    http-server dist
    ```

- 当需要构建的项目越来越复杂，需要的标志就会越多。在某种程度上说，就会变得难以控制。这个时候我们就需要一个文件来管理这些配置。
    ```
    mkdir build && cd build && touch webpack.config.js
    ```

- 开始webpack配置编写 [webpack配置文档](https://webpack.js.org/configuration/) ,通过配置文件打包构建 ,为了方便在package.json中配置build运行脚本, http-server启动项目太麻烦，使用webpack集成的devServer提供了大量方便的功能(即之前安装的webpack-dev-server)，在webpack.config中配置，同样在package.json中配置dev运行脚本
    ```
    "scripts": {
    "build":"webpack --config ./build/webpack.config.js",
    "dev":"webpack-dev-server --config ./build/webpack.config.js --mode development --open"
    }

    npm run dev
    ```
- 为了方便维护将webpack配置拆分，公共配置webpack.common.js，开发环境配置webpack.dev.js，生产环境配置webpack.prod.js，并安装webpack-merge插件方便各配置项合并,修改packagejson的执行脚本

### 搭建完整工程

- 整个流程跑通后，正式开始完整的工程配置----配置一个React相关的环境，
    安装React的依赖react和react-dom为了能够使用ES6语法及jsx，安装babel开发依赖，并配置babel(配置.babelrc,并在webpack.config.common中添加loader解析babel-loader)
    - 项目依赖添加：@babel/runtime，react，react-dom
    - 开发依赖添加：下列
    (@babel/runtime,Babel模块化运行时助手
    有时Babel可能会在输出中注入一些相同的代码，因此可能会重复使用。
    使用@babel/plugin-transform-runtime，它将替换对该@babel/runtime版本的函数的引用。
    "@babel/plugin-transform-runtime",
    "@babel/core",babel的核心库API
    "@babel/plugin-transform-modules-commonjs" 模块转换转换为commonjs模块,
    "@babel/preset-env"js语法转换智能预设,
    "@babel/preset-react"react的语法转换器, 
    "babel-loader"jsx的webpack,loader)
- [Babel](https://babeljs.io/) is a JavaScript compiler.
> babel-core如果某些代码需要调用Babel的API进行转码(例如将js字符串或文件转换为AST---抽象语法树)，就要使用babel-core模块。Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

- 现在我们删除dist下的html文件迁移到src目录下，为了让/src/目录下的模板文件index.html能自动编译到/dist目录下，并且所有的.js引用能自动插入到index.html中。我们需要使用Webpack的两个插件
    - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#plugins)，它简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，默认使用lodash模板提供你自己的模板(模板引擎)，或使用你自己的loader。
    - html-webpack-template，比默认模板多一些额外的功能
    - html-webpack-plugin提供了钩子，可以将其扩展以实现你之所需。已经有一些功能强大的插件可以与其零配置集成。(比如resource-hints-webpack-plugin使用\<link rel='preload'>和添加资源提示以加快初始页面加载速度)
    安装好开发依赖后配置到common.config的pluins中,到此 整个项目就可以跑起来了,打包也可正常成功。

- webpack配置多入口 别名解析 tsx解析 tsxloader，添加Typescript的支持,添加babel解析配置，安装相应包,配置[tscondig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
    - typescript
    - @babel/preset-typescript  (babel解析)
    - awesome-typescript-loader (webpack loader)

- 下一步着手解决CSS问题，webpack 中把一切都当做模块，现在组织css的解决方案可以概括为-->预编译语言 + 构建工具 + BEM + Aotmic-CSS全局样式+CSSModule组件样式+ POSTCSS,安装相应loader，配置到webpack中,配置postcss插件(.postcssrc.js)
    - style-loader,将处理结束的CSS代码存储在js中，运行时嵌入\<style>后挂载至html页面上
    - css-loader
    - node-sass
    - sass-loader
    - [postcss](https://postcss.org/) (提供 postcs API,有点类似css版babel)
    - [postcss-loader](https://github.com/postcss/postcss-loader) (webpack loader)
    - postcss-preset-env (postcss插件，在postcss的配置文件中配置)
    - postcss-px-to-viewport (postcss插件，在postcss的配置文件中配置)
    > [配置文件rc结尾由来](https://www.cnblogs.com/MYSQLZOU                                                                                          QI/p/5186952.html): 配置文件比较正规的叫法是,运行控制文件  run control

- package.json 文件中的 browserslist 只要package.json配置了browserslist对象,需要的工具将自动查找将自动匹配到并使用,也可以配置到具体的组件参数上，或者在工程的根目录下存在.browerslistrc配置文件（具体的影响到前端工具的编译情况，比如 Autoprefixer 可以给css加兼容性前缀babel-preset-env ， eslint-plugin-compat， stylelint-no-unsupported-browser-features 和 postcss-normalize，.babelrc文件也可以针对browser配置）

- CSS Module 使用配置，
    - css loader 配置modules
    - dependencies： [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)，Transforms styleName to className using compile time CSS module resolution.In contrast to react-css-modules, babel-plugin-react-css-modules has a lot smaller performance overhead (0-10% vs +50%; see Performance) and a lot smaller size footprint (less than 2kb vs 17kb react-css-modules + lodash dependency).
    - devDependencies：@types/react-css-modules，
    - devDependencies：css-modules-typescript-loader

- 静态文件处理（file-loader,url-loader）

- [eslint+husky+prettier+lint-staged提升前端应用质量](https://blog.csdn.net/u011521203/article/details/87546146)其实感觉这类配置可以依靠编辑器(IDE)会更方便
    > lint是对前端代码按照代码规则进行静态扫描的工具，主要负责对当前本地代码进行规范检查
    - eslint，JavaScript代码静态检查工具
    - stylelint，检测css规范
    - lint-staged，对当前修改后的文件进行扫描，即进行git add加入到stage区的文件进行扫描即可，完成对增量代码进行检查
    - prettier，对代码进行格式化
    - husky，通过git hook在本地进行commit的时候触发代码扫描来确保本地代码的质量。

- css代码抽离及公共代码分割
    > 代码分割的本质，就是在“源码直接上线”(过程可控，减少白屏时间，http请求多，性能开销大)和“打包为唯一的脚本main.bundle.js”(服务器压力小，包太大页面空白时间长)这两种极端方案之间寻找一种更符合实际场景的中间状态，用可接受的服务器性能压力增加来换取更好的用户体验。

- 打包结果分析（Bundle Buddy，webpack-bundle-analyser）

- 持续集成（CI，Continuous Integration）,检查(lint)----构建(build)(webpack .etc)----测试(test)---部署，使用上层的工具（任务执行器）来管理整个持续集成（CI），而把打包的部分交给webpack(webpak暴露了一些方法Node-API，使得开发者可以通过调用他们而在脚本中启动webpack)