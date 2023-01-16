/*
 * Author  Vincy.Li
 * Date  2023-01-09 14:36:40
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-16 19:40:15
 * Description
 */
import React, {
  lazy,
  createElement,
  Suspense,
  ComponentType,
  ReactNode,
} from "react";
import BasicLayout from "../src/components/Layout/BasicLayout";
import NotFound from "../src/pages/NotFound/NotFound";
import routerConfigType from "../global.d";
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
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "",
          element: lazyElement(() => import("../src/pages/Home/Home")),
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
    {
      path: "login",
      element: lazyElement(() => import("../src/pages/Login/Login")),
    },
  ];
  return routerArr;
}

export default routerConfig;
