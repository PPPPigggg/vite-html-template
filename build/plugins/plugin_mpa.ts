import { createMpaPlugin } from "vite-plugin-virtual-mpa";
import { normalizePath } from "vite";
import { basename } from "path";

import { routes } from "../../src/router/index.ts";
console.log("routes: ", routes);

const rewrites: any = [
  // {
  //   from: new RegExp(normalizePath(`/`)),
  //   to: () => normalizePath(`/home.html`),
  // },
];

const pages: any = [];

function pathSplice(path: string) {
  const pathArr = path.match(/views\/.*\.html/);
  if (pathArr && pathArr[0]) {
    return `src/${pathArr[0]}`;
  }
}

routes.forEach((route) => {
  const { path, component } = route;
  if (path && component) {
    const fileName = basename(component);
    const fname = fileName.split(".")[0];

    const formatPath = path.replace(/^\//, "");
    pages.push({
      name: fname,
      filename: formatPath ? `${formatPath}.html` : fileName,
      template: pathSplice(component),
      entry: "/src/main.ts",
    });

    if (path === "/") {
      rewrites.push({
        from: new RegExp(`^${normalizePath(`${path}`)}$`),
        to: () => normalizePath(`/${fileName}`),
      });
    }
  }
});
export default function () {
  return createMpaPlugin({
    htmlMinify: true,
    pages: [
      // {
      //   name: "home",
      //   /**
      //    * 文件名是可选的，默认将会是`${name}.html`，这个路径是相对于`build.outDir`
      //    */
      //   filename: "home.html", // 将会在编译时输出到sites/fruits/apple.html
      //   template: "src/views/home/home.html", // 相对路径
      //   entry: "/src/views/home/home.ts",
      // },
      ...pages,
    ],
    /**
     * 通过该选项来配置 history fallback rewrite rules
     * 如果你像上面这样配置页面的话，那下面的这份配置将会自动生成。
     * 否则你需要自己编写重定向规则。
     */
    rewrites: rewrites,
    previewRewrites: rewrites,

    watchOptions: {
      include: "src/**/*",
      handler(ctx) {
        // 手动触发更新
        ctx.server.ws.send({ type: "full-reload" });
      },
    },
  });
}
