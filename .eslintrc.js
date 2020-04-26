module.exports = {
  root: true,

  // 解析器选项
  parserOptions: {
    // parser: "babel-eslint",  // 使用 Babel 语法解析引擎
    sourceType: "module",    // 使用 ES 模块
    ecmaVersion: 2020,       // 支持到 ES2020 语法规范
    ecmaFeatures: {          // 支持 jsx
      jsx: true
    }
  },

  // 运行环境
  env: {
    browser: true,   // 需要浏览器 API
    node: true,      // 需要 Node API
    es2020: true,    // 需要 ES2020 API
  },

  // 扩展规则与配置
  extends: ["eslint:recommended", "@vue/prettier", "plugin:vue/essential"],

  // 扩展全局变量, false表示允许使用，但不允许覆盖它们
  globals: {
    process: false
  },

  // Lint规则: 忽略(0, off) 警告(1, warn) 报错(2, error)
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unsafe-finally": "off",
    "no-empty": "off",
    "no-unused-vars": "off",
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
