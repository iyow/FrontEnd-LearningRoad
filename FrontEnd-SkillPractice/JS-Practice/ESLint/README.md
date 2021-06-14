ESLint 是一个代码检查工具，通过静态的分析，寻找有问题的模式或者代码。默认使用 Espree 解析器将代码解析为 AST 抽象语法树(此处可以使用 astexplorer 快速方便查看解析成 AST 的结构)，然后通过安装配置或自定义规则对代码进行检查。



- [自定义 ESLint 规则开发](https://eslint.org/docs/developer-guide/working-with-rules#rule-basics)
    - meta（对象）包含规则的元数据
    - create ( function ) 返回一个对象，其中包含了 ESLint 在遍历 JavaScript 代码的抽象语法树 AST ( ESTree 定义的 AST ) 时，用来访问节点的方法，（）
    - context.report ( ) 用来发布警告或错误，并能提供自动修复功能（取决于你所使用report传入的配置）
- ESLint plugin 开发(想使用自定义的 ESLint 规则，你需要自定义一个 ESLint 的插件)
    - 创建项目(可基于 Yeoman generator,快速创建 ESLint plugin 项目。)

```
├── README.md
├── docs // 使用文档
│   └── rules // 所有规则的文档
│       └── settimeout-no-number.md // 具体规则文档
├── lib // eslint 规则开发
│   ├── index.js 引入+导出rules文件夹的规则
│   └── rules // 此目录下可以构建多个规则
│       └── settimeout-no-number.js // 规则实现细节
├── package.json
└── tests // 单元测试
    └── lib
        └── rules
            └── settimeout-no-number.js // 测试该规则的文件
```

- 自定义Processor 处理器

插件可以提供处理器。processor提供两个钩子函数preprocess、postprocess。preprocess是在parser之前执行获取检测代码，可以对代码块进行操作。postprocess是执行完rule之后的执行，可以获取到messageList问题信息。处理器还提供supportsAutofix` 属性控制是否修复问题，该属性优先级大于rule的元数据fixable 。

- [共享配置信息](https://eslint.org/docs/developer-guide/shareable-configs)，配置信息的 .eslintrc 文件是你的项目中重要的部分，正因为这样，你可能想要将你的配置信息分享给其他项目或人。
我们有两种方式来共享配置：

    - 创建一个npm包，确保模块名称以eslint-config-开头，例如eslint-config-myconfig。然后在项目eslint配置中用“extends”引入。具体请参考eslint 官网。
    - 将共享配置集成到plugin configs中

- 应用实践
    - 禁止硬编码业务域名