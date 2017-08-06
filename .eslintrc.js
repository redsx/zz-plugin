module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  // 自定义规则再次添加
  'rules': {
    // 箭头函数只有一个参数时，可以省略圆括号
    'arrow-parens': 0,
    // 关闭不必要的转义字符通知
    'no-useless-escape': 0
  }
}