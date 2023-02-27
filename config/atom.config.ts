/*
 * Author  Vincy.Li
 * Date  2023-02-27 13:53:13
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-27 13:57:53
 * Description
 */
import { atom } from "recoil";
export const userInfo = atom({
  key: "userInfo",
  default: {
    userId: null,
  },
});
