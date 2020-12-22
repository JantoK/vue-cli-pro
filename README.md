# Vue-Cli-Pro

> Vue-Cli-Pro 是一款根据VueCli进行强化的脚手架，增加了在实际开发中最经常用到的一些实用功能的配置或者插件的安装。

### pro功能概览
* 新增全局样式重制reset.styl
* 新增NProgress
* 重置滚动条样式
* 首次加载等待时增加加载中样式
* 添加SvgIcon组件（svg-sprite-loader）
* 封装axios以及api
* 引入代码分析工具（webpack-bundle-analyzer）
* 引入打包Gzip压缩工具（compression-webpack-plugin）

### 自定义指令一览
* v-copy 点击复制文本
* v-lazyLoad 图片懒加载功能
* v-longPress 鼠标长按事件
* v-throttle 点击事件防抖

### 重要依赖版本概览
* vue/cli: 4.4.6
* vue: 2.6.11
* axios: 0.21.0
* core-js: 3.6.4

### 注意事项
* env中的GZIP必须要在打包的时候才打开，否则项目运行时会删除原资源（也可在config中自行配置去除）
