/*
 * Author  Vincy.Li
 * Date  2023-01-16 17:56:09
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-03 10:39:32
 * Description
 */
import { ReactNode } from "react";
import lodash from "lodash";
import apiType from "@/services";
import JSEncrypt from "jsencrypt/jsencrypt/lib/index.d.ts";
import envType from "config/env.config";
// 定义全局类型，declare global (global为关键字，不能变)
// 在这里定义的全局类型或变量不需要再引入 直接使用就可以
declare global {
  interface routerConfigType {
    path: string;
    element: ReactNode;
    children?: routerConfigType[];
  }
  var VITE_APP_TITLE: string;
  var api: typeof apiType;
  var _: typeof lodash;
  var JSEncrypt: typeof JSEncrypt;
  var env: typeof envType;
}
