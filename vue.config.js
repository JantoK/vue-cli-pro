const path = require("path");
// 代码分析工具
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
// Gzip
const CompressionPlugin = require("compression-webpack-plugin");
// 路径处理
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    // 清除默认的svg规则
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    // 引入svg-sprite-loader规则
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // 代码分析工具开启
    if (process.env.USE_ANALYZER === "true") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(WebpackBundleAnalyzer.BundleAnalyzerPlugin);
    }
    // Gzip https://www.webpackjs.com/plugins/compression-webpack-plugin/
    if (process.env.GZIP === "true") {
      config.plugin("CompressionPlugin").use(CompressionPlugin, [
        {
          // 是否删除原资源
          deleteOriginalAssets: true
        }
      ]);
    }
  }
};
