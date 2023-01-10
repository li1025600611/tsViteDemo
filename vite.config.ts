/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:16:14
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-09 15:26:13
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
          mode === "development"
            ? "[path][name]__[local]__[hash:5]"
            : "[local]-[hash:5]",
      },
    },
  };
});
