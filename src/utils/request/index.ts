/*
 * Author  Vincy.Li
 * Date  2023-02-22 13:46:22
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-22 17:24:27
 * Description
 */
import { message } from "antd";
import axios, { type AxiosResponse } from "axios";
import Crypto from "crypto-js";
// import Qs from "qs";
const instance = axios.create();

// 获取签名
const getSignature = () => {
  const timestamp = new Date().valueOf();
  const aNonce = Math.random();
  const secret = "Z4thEukFO4mZG3eZ";
  const signature = Crypto.MD5(secret + aNonce + timestamp).toString();
  return {
    "X-Timestamp": timestamp,
    "X-Nonce": aNonce,
    "X-Signature": signature.toUpperCase(),
  };
};

// 请求头基本配置
const getAxiosConfig = () => {
  const token = localStorage.getItem("do_jwt_Bearer");
  const userName = localStorage.getItem("do_user_name");
  const userId = localStorage.getItem("do_user_id");
  const userRealName = localStorage.getItem("do_user_real_name");
  const prismHeaders = getSignature();
  return {
    headers: {
      Authorization: token,
      "content-type": "application/json",
      user: userName,
      userId: userId,
      userRealName: userRealName,
      ...prismHeaders,
    },
    timeout: 60000,
    // `paramsSerializer`是可选方法，主要用于序列化`params` ts 提示与AxiosRequestConfig类型不兼容
    // paramsSerializer: function (params: any) {
    //   return Qs.stringify(params, { arrayFormat: "brackets" });
    // },
  };
};

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<any, any>): AxiosResponse<any, any> => {
    if (response.status >= 200 && response.status < 300) {
      const { data = {}, config = {} } = response;
      if (data.status !== "SUCCESS") {
        // 请求错误，统一在页面上提示
        message.error(data.msg);
      }
      return response;
    }
    return response;
  }
);

// 公用请求方法
function commonRequest(url: string, config: object) {
  const baseConfig = getAxiosConfig();
  // 如果有额外配置，与基本配置合并传入request
  const newConfig = {
    url,
    ...baseConfig,
    ...config,
  };
  return instance
    .request(newConfig)
    .then((response) => {
      return response ? response.data : undefined;
    })
    .catch((error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 400 || status === 500) {
          return {
            ...error.response.data,
            resStatus: status,
          };
        }
      }
    });
}

/**
 * get请求
 * @param {string} 请求地址
 * @param {Object} 请求配置
 */
export function get(url: string, params?: object, options?: Object) {
  return commonRequest(url, {
    method: "get",
    data: params,
    ...options,
  });
}

/**
 * get请求
 * @param {string} url 请求地址
 * @param {string} params 请求参数
 * @param {Object} option 请求配置
 */
export function post(url: string, params?: Object, options?: Object) {
  return commonRequest(url, {
    method: "post",
    ...options,
    data: params,
    ...options,
  });
}
