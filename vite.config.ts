import { defineConfig } from "vite";
import { join } from "path";
import { plugins } from "./build/plugins/index.ts";

export default defineConfig(({ command }) => {
  const isBuild = command === "build"; // 当前是否是build模式
  // const root = process.cwd(); // 当前node的工作目录
  // const env = loadEnv(mode, root); // 环境变量
  return {
    appType: "mpa",
    resolve: {
      // 配置路径别名
      alias: {
        "@": join(__dirname, "src"),
      },
    },

    build: {
      rollupOptions: {
        // 静态资源分类打包
        output: {
          // 用于指定 chunks static/js/文件夹中js的文件名
          chunkFileNames: "static/js/[name]-[hash].js", // 用于指定 chunks 的入口文件名。
          entryFileNames: "static/js/[name]-[hash].js", // 用于自定义构建结果中的静态文件名称通过【ext】来分类文件
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    esbuild: {
      // 生产环境下移除console和debugger
      drop: isBuild ? ["console", "debugger"] : undefined,
    },
    plugins,
  };
});
