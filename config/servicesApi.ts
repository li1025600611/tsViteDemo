/*
 * Author  Vincy.Li
 * Date  2023-02-22 13:22:54
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-22 17:14:58
 * Description
 */
import envConfig from "./env.config";

let NginxIp = "";
const mode = envConfig()?.pattern;
if (mode === "dev") {
  NginxIp = "http://10.2.2.178:10000";
} else if (mode === "test") {
  NginxIp = "http://10.2.2.245:10000";
}

const apiConfig = {
  userApi: `${NginxIp}/webapi/userManage/api/v1/userManage`,
};
export default apiConfig;
