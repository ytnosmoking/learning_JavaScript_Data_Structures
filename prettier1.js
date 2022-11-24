module.exports = {
  arrowParens: 'always', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSameLine: false,
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'strict',
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 80, // 每行宽度
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true, // 句尾是否加;
  singleQuote: false, // 使用单引号而不是双引号
  tabWidth: 2, // 缩进字节数
  trailingComma: 'es5', // es5多行时，尽可能打印尾随的逗号
  useTabs: false, // 是否利用tab替代空格
  vueIndentScriptAndStyle: false,

  stylelintIntegration: false, // 不让prettier使用stylelint的代码格式进行校验
  ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  endOfLine: 'auto' // 结尾是 \n \r \n\r auto
};
