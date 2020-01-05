module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 按需引入Css时做如下配置：
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
