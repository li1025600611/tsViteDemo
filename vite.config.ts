/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:16:14
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-03 11:03:33
 * Description
 */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /**
   * 开发环境：command==='serve' mode==='development'
   * 生产环境：command==='build' mode==='production'
   */
  return {
    plugins: [
      react(),
      inject({
        // 将文件注入全局，可以直接使用
        api: path.resolve(__dirname, "src/services/index.ts"),
        _: "lodash",
        env: path.resolve(__dirname, "config/env.config"),
      }),
    ],
    define: {
      // 定义全局变量，不需要引入
      TEST_DEFINE: JSON.stringify(env.VITE_TEST),
      VITE_APP_TITLE: JSON.stringify("test title"),
      // env: path.resolve(__dirname, "config/env.config"),
    },
    css: {
      modules: {
        // 配置css编译后在浏览器中的类名
        generateScopedName:
          mode === "development" ? "[path][name]__[local]" : "[local]",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        config: path.resolve(__dirname, "config"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 默认值
    },
    server: {
      host: "0.0.0.0",
      port: 5512,
      strictPort: true, // 设为TRUE时若端口被占用会直接退出，FALSE会尝试下一个可用端口
      open: true, // 自动打开浏览器；当此值为字符串时，会被用作 URL 的路径名
    },
  };
});
