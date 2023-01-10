/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:48:01
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-09 19:57:29
 * Description
 */
import { useState } from "react";
import { Menu, Input, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Space } from "antd";
import styles from "./BasicLayout.module.less";
import { Outlet, useNavigate } from "react-router-dom";

function BasicLayout() {
  const items: MenuProps["items"] = [
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

  const menuItems: MenuProps["items"] = [
    {
      key: "essay",
      label: "写文章",
    },
    {
      key: "note",
      label: "写笔记",
    },
    {
      key: "code",
      label: "写代码",
    },
    {
      key: "drafts",
      label: "草稿箱",
    },
  ];

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(["home"]);

  const onMenuClick: MenuProps["onClick"] = ({ key, keyPath }) => {
    navigate(key);
    setCurrentPage(keyPath);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div
          onClick={() => {
            setCurrentPage(["home"]);
            navigate("/home");
          }}
        >
          <img src="/juejinLogo.svg" />
        </div>
        <div className={styles.content}>
          <Menu
            items={items}
            mode="horizontal"
            onClick={onMenuClick}
            defaultSelectedKeys={["home"]}
            selectedKeys={currentPage}
          />

          <div className={styles.inputGroup}>
            <Input.Search
              placeholder="搜索稀土掘金"
              width={262}
              style={{ height: 36, width: 262 }}
            />
            {/* menu的类型必须是 { items:items}  key必须为items*/}
            <Dropdown.Button
              menu={{ items: menuItems }}
              style={{ marginLeft: 16, height: 36 }}
              type="primary"
              icon={<CaretDownOutlined style={{ fontSize: 10 }} />}
            >
              创作者中心
            </Dropdown.Button>
          </div>

          <div className={styles.member}>
            <img src="/member.svg" style={{ width: 24 }} />
            <span>会员</span>
          </div>

          <div className={styles.message}>
            <img src="/message.svg" style={{ width: 24, height: 27 }} />
          </div>

          <div className={styles.person}>
            <img src="/personalPhoto.png" style={{ width: 36, height: 36 }} />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.childrenContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
