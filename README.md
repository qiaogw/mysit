    "dev": "webpack-dev-server --inline --hot --quiet --watch",
    "build": "webpack --progress  --watch --colors",
    "dist": "set NODE_ENV=production && webpack --progress --colors"

解释一下:
build 是在我们开发环境下执行的构建命令;
dev 也是在开发环境下执行，但是加了webpack最强大的功能－－搭建静态服务器和热插拔功能（这个在后面介绍;
dist 是项目在要部署到生产环境时打包发布。

---content-base: 可以是文件、目录或者url，表示静态资源的基础路径
 - --quiet: 布尔值，控制是否要在控制台输出所有信息
 - --colors: 为控制台输出信息增加一些颜色
 - --no-info: 禁止输出一些无聊的信息？
 - --host: 主机名或IP地址
 - --watch：观察者模式，每次修改保存webpack.config.js中引用文件，bundle.js的文件会自动更新
 - --inline：如果修改webpack.config.js中依赖的文件并保存，浏览器中的内容就会自动更新了
 - --hot: 表示热插拔，且将服务器切换到热模式中。注意点：不要再额外添加HotModuleReplacementPlugin

 package:
 version 完全匹配
 >version 大于这个版本
 >=version大于或等于这个版本
 <version
 <=version
 ~version 非常接近这个版本
 ^version 与当前版本兼容
 1.2.x X代表任意数字，因此1.2.1, 1.2.3等都可以
 http://... Unix系统下使用的tarball的URL。
 * 任何版本都可以
 ""任何版本都可以
 version1 - version2  等价于 >=version1 <=version2.
 range1 || range2 满足任意一个即可

## License
MIT
