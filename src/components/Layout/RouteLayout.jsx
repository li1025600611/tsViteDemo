/*
 * Author  Vincy.Li
 * Date  2023-03-13 19:39:43
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-13 19:57:33
 * Description
 */
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import routerConfig from "../../../config/routerConfig";

function RouteLayout() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getSystemMenu();
  }, []);

  const getSystemMenu = async () => {
    // 判断是开发环境还是生产环境
    const mode = import.meta.env.MODE;
    if (mode === "development") {
      // 开发环境判断是local还是menuConfig
      const menuMode = env.menuConfig;
      if (menuMode === "local") {
        // 拉取本地路由
        setMenus(routerConfig());
      } else {
        // 拉取线上路由
        const res = await api.User.getUserMenu();
        setMenus(res.data);
      }
    } else {
      // 拉取线上路由
    }
  };

  console.log("menus", menus);

  const isLogin = localStorage.getItem("do_user_id"); // 判断是否登陆

  return (
    <>
      {!isLogin && <Navigate to="/login" />}
      {isLogin && <div>routes</div>}
    </>
  );
}

export default RouteLayout;
