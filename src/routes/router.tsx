/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:30:51
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-09 11:22:32
 * Description Suspense与lazy配合懒加载；加载前展示Suspense里面的内容（loading...）
 */
import { lazy, createElement, Suspense, Component, ComponentType } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout";
import NotFound from "../pages/NotFound/NotFound";

// 这是正常懒加载写法 在引入时需要用<Suspense><Home/></Suspense>
const Home = lazy(() => import("../pages/Home/Home"));
const Course = lazy(() => import("../pages/Course/Course"));

// 封装懒加载组件 lazy与Suspense配合使用
const lazyElement = (
  element: () => Promise<{ default: ComponentType<any> }>
) => (
  <Suspense fallback={<>loading...</>}>{createElement(lazy(element))}</Suspense>
);

export default function routes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        {/* 重定向首页为Home页 */}
        <Route
          path=""
          element={lazyElement(() => import("../pages/Home/Home"))}
        />
        <Route
          path="home"
          element={lazyElement(() => import("../pages/Home/Home"))}
          index
        />
        <Route
          path="course"
          element={lazyElement(() => import("../pages/Course/Course"))}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
