/*
 * Author  Vincy.Li
 * Date  2023-02-17 17:52:18
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-17 17:55:24
 * Description
 */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // 禁止使用 var
    "no-var": "error",
    // 优先使用interface而不是type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
  },
};
