/*
 * Author  Vincy.Li
 * Date  2023-01-16 17:56:09
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-16 19:21:41
 * Description
 */
import { ReactNode } from "react";
// 定义全局类型，declare global (global为关键字，不能变)
declare global {
  interface routerConfigType {
    path: string;
    element: ReactNode;
    children?: routerConfigType[];
  }
}

// 使用 api.device 与global不同 global直接用 routerConfig
// declare namespace api {
//   interface device {
//     name: string;
//   }
// }
