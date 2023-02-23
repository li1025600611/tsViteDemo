/*
 * Author  Vincy.Li
 * Date  2023-02-22 17:55:13
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-23 10:37:46
 * Description
 */
import apiConfig from "config/servicesApi";
import * as request from "@/utils/request";

const { userApi = "" } = apiConfig;

export function getVerify() {
  return request.get(`${userApi}/verifyCode`);
}
