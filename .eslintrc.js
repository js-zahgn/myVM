module.exports = {
  root: true, 
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true,
    "commonjs": true,
    "amd": true
  },
  rules: {
    /**
     * 最佳实践
     */
    "strict": [
      0,
      "global"
    ],
    "global-strict": [
      0,
      "always"
    ], // deprecated rule, 忽略，采用上面规则限制
    "no-extra-strict": 0,
    "no-shadow": 1, // 局部变量和外层变量重名
    "no-unused-vars": [
      1,
      { // 局部变量未使用
        "vars": "local",
        "args": "after-used",
        "varsIgnorePattern": "createElement"
      }
    ],
    "no-undef": 2, // 未定义的变量
    "no-unused-expressions": 1, // 未使用的表达式
    "no-use-before-define": 0, // 允许定义前使用
    "no-debugger": 2, // 禁用 debugger
    "no-dupe-args": 2, // 禁止 function 定义中出现重名参数
    "no-dupe-keys": 2, // 禁止对象字面量中出现重复的 key
    "no-duplicate-case": 2, // 禁止重复的 case 标签
    "yoda": 0,
    "eqeqeq": 0,
    "no-new": 0, // 允许 new 创建的对象没有被引用
    "consistent-return": 0, // 允许没有 return
    "dot-notation": [
      1,
      { // 操作对象属性时，优先使用 . 操作
        "allowKeywords": true
      }
    ],
    "no-extend-native": 2, // 禁止通过 prototype 给原生对象增加额外方法。
    "no-native-reassign": 2, // 阻止复写内置类型
    "no-constant-condition": [
      2,
      {
        "checkLoops": false
      }
    ], // 提示拒绝使用已经明确意义的判断条件 if (true)
    "max-len": [
      1,
      100,
      2,
      {
        "ignorePattern": "^import\\s.+\\sfrom\\s.+;$",
        "ignoreComments": true,
        "ignoreUrls": true
      }
    ],
    "no-caller": 2,
    "no-loop-func": 1,
    // nodejs 环境规则
    "no-console": 0, // 代码禁止出现 console
    "no-catch-shadow": 2, // try catch 捕获的变量名禁止重名定义
    "no-new-require": 0, // require 前面是否能添加 new
    "no-mixed-requires": [
      0,
      false
    ], // 是否合并 var requires
    "no-path-concat": 0, // 是否可以自行拼接 path 还是必须要引用 path 模块
    "handle-callback-err": 0, // 代码里面是否有处理 err 的逻辑？
    /**
     * 代码风格
     */
    "no-empty": 0, // 允许空 block 语句
    "camelcase": [
      0,
      { // 驼峰，同时检查属性名
        "properties": "always"
      }
    ],
    "quotes": [
      1,
      "single",
      "avoid-escape"
    ], // 引号，强制使用单引号
    "brace-style": [
      1,
      "1tbs",
      {
        "allowSingleLine": false
      }
    ],
    // "comma-spacing": [2, { // 逗号空格
    //   "before": false,
    //   "after": true
    // }],
    // "comma-style": [2, "last"], // 逗号风格
    "eol-last": 0, // 最后留一行空行
    "func-names": 0, // 是否所有函数必须命名
    // "new-cap": [2, { // 类名首字母大写
    //   "newIsCap": true
    // }],
    // "key-spacing": [2, { // object 的 key value ：的前后空格
    //   "beforeColon": false,
    //   "afterColon": true
    // }],
    "no-multi-spaces": [
      "error",
      {
        "ignoreEOLComments": true
      }
    ], // 表达式中是否允许多个空格,忽略注释
    "no-multiple-empty-lines": 0, // 是否允许多行空格
    "no-nested-ternary": 0, // 是否禁止三目运算
    "no-new-object": 2, // 禁止 new Object()
    "no-spaced-func": 2, // 函数与括号的空格
    "no-trailing-spaces": 0, // 是否允许末尾有空格
    "no-extra-parens": [
      1,
      "functions"
    ], // "no-wrap-func": 1, 禁止额外的括号 允许括号内是方法
    "no-underscore-dangle": 0, // 允许任意使用下划线
    // "one-var": [
    //   1,
    //   "never"
    // ], // 定义变量一行一个
    "padded-blocks": [
      0,
      "never"
    ], // 块代码上下不能留空行
    "semi": 1, // 校验分号
    "semi-spacing": 1, // 分号后面留空
    "keyword-spacing": 1, // 关键词后面加空格
    "space-before-blocks": 1, // 块级代码加空格
    "space-before-function-paren": 0, // 函数名与括弧之间空格
    "space-infix-ops": 1, // 操作符之间的空格
    "spaced-comment": [
      1,
      "always",
      {
        "line": {
          "markers": [
            "/"
          ],
          "exceptions": [
            "-",
            "+"
          ]
        },
        "block": {
          "markers": [
            "!"
          ],
          "exceptions": [
            "*"
          ],
          "balanced": true
        }
      }
    ], // 注释斜线后面是否需要空格
  }
}