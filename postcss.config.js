// vue cli/vite
module.exports = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {  // 注意这里的插件名称已更改
      viewportWidth: 375,
      selectorBlackList: ["favor"]
      // 其他配置...
    }
  }
};