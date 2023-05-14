import { Alpine as AlpineType } from "alpinejs";
// 'export {};'用来确保这个文件能够生效
export {};

/**
 * 全局类型声明，无需引入直接在文件使用即可获得类型提示
 */
declare global {
  // 路由配置类型
  interface IRouterConfigType {
    path: string;
    component: IString;
  }

  // alpinejs类型
  var Alpine: AlpineType;
}
