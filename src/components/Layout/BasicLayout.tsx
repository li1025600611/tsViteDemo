/*
 * Author  Vincy.Li
 * Date  2023-01-09 10:48:01
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-09 11:27:34
 * Description
 */
import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

function BasicLayout() {
  return (
    <div>
      <Header />
      layout
      <Outlet />
    </div>
  );
}

export default BasicLayout;
