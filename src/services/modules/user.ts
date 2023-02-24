/*
 * Author  Vincy.Li
 * Date  2023-02-22 17:55:13
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-24 09:41:32
 * Description
 */
import apiConfig from "config/servicesApi";
import * as request from "@/utils/request";

const { userApi = "" } = apiConfig;

export function getVerify() {
  return request.get(`${userApi}/verifyCode`);
}

/**
 * 用户登录
 * @param 用户名 密码 验证码 uuid
 */
export function login(params = {}) {
  return request.post(`${userApi}/login`, params);
}

/**
 *
 * @returns 获取公钥
 */
export function getPublicKey() {
  return request.get(`${userApi}/crypt/publicKey`);
}
