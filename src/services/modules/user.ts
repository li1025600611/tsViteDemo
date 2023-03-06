/*
 * Author  Vincy.Li
 * Date  2023-02-22 17:55:13
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-02 19:25:55
 * Description
 */
import apiConfig from "config/servicesApi";
import * as request from "@/utils/request";

const { userApi = "", dataSupportApiPath = "" } = apiConfig;

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

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get(`${userApi}/sysUser/personal/details`);
}

/**
 * 获取路由菜单
 */
export function getSystemConfig() {
  return request.get(`${dataSupportApiPath}/sysConfig/system`);
}

/**
 * @description 获取minio地址
 * @param {id}
 */
export function queryMinioAddress() {
  return `${dataSupportApiPath}/minioResource/getResponse?minioResourcePath=`;
}

export function getUserMenu() {
  return request.get(`${userApi}/sysMenu`);
}
