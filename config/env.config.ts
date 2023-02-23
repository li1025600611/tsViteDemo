/*
 * Author  Vincy.Li
 * Date  2023-02-22 13:28:31
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-22 13:41:48
 * Description
 */
export default function getConfig() {
  const mode = import.meta.env.MODE;
  if (mode === "development") {
    return {
      pattern: "dev", // or test
    };
  }
}
