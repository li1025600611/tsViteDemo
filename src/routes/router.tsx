/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:30:51
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-16 19:41:23
 * Description Suspense与lazy配合懒加载；加载前展示Suspense里面的内容（loading...）
 */
import { Routes, Route } from "react-router-dom";
import routerConfig from "../../config/routerConfig";
import routerConfigType from "../../global.d";

export default function routes() {
  const list = routerConfig();

  const getRoutes = (list: routerConfigType[]) => {
    return list.map((route) => {
      return (
        <Route path={route.path} element={route.element} key={route.path}>
          {route?.children && getRoutes(route.children)}
        </Route>
      );
    });
  };

  return <Routes>{getRoutes(list)}</Routes>;
}
