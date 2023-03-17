/*
 * Author  Vincy.Li
 * Date  2023-01-09 14:36:40
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-13 19:53:20
 * Description Suspense与lazy配合懒加载；加载前展示Suspense里面的内容（loading...）
 */
import React, {
  lazy,
  createElement,
  Suspense,
  ComponentType,
  ReactNode,
} from "react";
import { RecoilRoot } from "recoil";
import BasicLayout from "../src/components/Layout/BasicLayout.jsx";
import NotFound from "../src/pages/NotFound/NotFound";
import { Navigate } from "react-router-dom";

function routerConfig() {
  // 这是正常懒加载写法 在引入时需要用<Suspense><Home/></Suspense>
  // const Home = lazy(() => import("../pages/Home/Home"));
  // const Course = lazy(() => import("../pages/Course/Course"));

  // 封装懒加载组件 lazy与Suspense配合使用
  const lazyElement = (
    element: () => Promise<{ default: ComponentType<any> }>
  ) => (
    <Suspense fallback={<>loading...</>}>
      {createElement(lazy(element))}
    </Suspense>
  );

  const routerArr: routerConfigType[] = [
    {
      path: "",
      element: <Navigate to="login" />, // 默认进入登录页
    },
    {
      path: "login",
      element: lazyElement(() => import("../src/components/Login")),
    },
    {
      path: "/",
      element: (
        <RecoilRoot>
          <BasicLayout />
        </RecoilRoot>
      ),
      children: [
        {
          path: "",
          element: <Navigate to="home" replace={true} />,
        },
        {
          path: "home",
          element: lazyElement(() => import("../src/pages/Home/Home")),
          children: [
            {
              path: "second",
              element: lazyElement(
                () => import("../src/pages/Home/HomeSecond")
              ),
            },
          ],
        },
        {
          path: "course",
          element: lazyElement(() => import("../src/pages/Course/Course")),
        },
        {
          path: "live",
          element: lazyElement(() => import("../src/pages/Live/Live")),
        },
        {
          path: "events",
          element: lazyElement(() => import("../src/pages/Events/Events")),
        },
        {
          path: "challenge",
          element: lazyElement(
            () => import("../src/pages/Challenge/Challenge")
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
  return routerArr;
}

export default routerConfig;
