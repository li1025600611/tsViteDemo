/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:48:01
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-17 19:57:51
 * Description 增加安全校验  登陆过了正常跳转 未登陆返回登陆页面
 *             已经登陆的话 根据开发模式或线上模式 返回不同的路由 Route zui
 */
import { useState, useEffect } from "react";
import { Menu, Input, Dropdown, Layout, Drawer } from "antd";
import RouteLayout from "./RouteLayout.jsx";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./BasicLayout.module.less";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import Base64 from "base-64";
const { Header, Content, Sider } = Layout;
import Logo from "@/assets/logo.svg";

function BasicLayout() {
  const [currentPage, setCurrentPage] = useState(["home"]);
  console.log("本次提交");
  console.log("跳过本次提交");
  console.log("跳过本次提交222");
  const items = [
    {
      key: "home",
      label: "首页",
    },
    {
      key: "course",
      label: "课程",
    },
    {
      key: "live",
      label: "直播",
    },
    {
      key: "events",
      label: "活动",
    },
    {
      key: "challenge",
      label: "竞赛",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // getUserInfo();
    // getSystemMenu();
    // queryMinioAddress();
    // getServerMenu();
  }, []);

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await api.User.getUserInfo();
    if (res && res.status === "SUCCESS") {
      localStorage.setItem("do_user_id", Base64.encode(res.data.userId));
      localStorage.setItem(
        "do_user_real_name",
        window.btoa(encodeURIComponent(res.data.realName))
      );
    }
  };

  // 获取图片信息
  const getSystemMenu = async () => {
    const res = await api.User.getSystemConfig();
  };

  // 获取MinIo地址
  const queryMinioAddress = async () => {
    const res = await api.User.queryMinioAddress();
  };

  // 获取菜单
  const getServerMenu = async () => {
    // 本地模式或在线模式
    const mode = env.menuConfig;
    if (mode === "local") {
      // 本地路由菜单
    } else {
      const res = await api.User.getUserMenu();
    }
  };

  const onMenuClick = ({ key, keyPath }) => {
    navigate(key);
    setCurrentPage(keyPath);
  };
  const isLogin = localStorage.getItem("do_user_id"); // 判断是否登陆

  return (
    <>
      {!isLogin && <Navigate to="/login" />}
      {isLogin && (
        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <div className={styles.leftHeader}>
              <img src={Logo} />
              <h2 className={styles.title}>智慧变电站数字孪生系统</h2>
            </div>
            <div className={styles.rightHeader}>右</div>
          </Header>
          <Layout className={styles.contentLayout}>
            <Sider collapsible={true}>
              <Menu items={items} theme="dark" />
            </Sider>

            <Content className={styles.content}>
              <RouteLayout />
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
}

export default BasicLayout;
