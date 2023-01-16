/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:16:14
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-16 14:39:31
 * Description
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    css: {
      modules: {
        // 配置css编译后在浏览器中的类名
        generateScopedName:
          mode === "development" ? "[path][name]__[local]" : "[local]",
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5512,
      strictPort: true, // 设为TRUE时若端口被占用会直接退出，FALSE会尝试下一个可用端口
      open: true, // 自动打开浏览器；当此值为字符串时，会被用作 URL 的路径名
    },
  };
});
