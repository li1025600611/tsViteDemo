/*
 * Author  Vincy.Li
 * Date  2023-02-20 17:03:24
 * LastEditors  Vincy.Li
 * LastEditTime  2023-02-23 10:50:17
 * Description 登陆页面
 */
import styles from "./index.module.less";
import { Button, Form, Input } from "antd";
import { type SyntheticEvent } from "react";
import verifyCountPng from "/login/verifyCount.jpeg";
export default function Login() {
  const [form] = Form.useForm();
  const onVerifyKeyUp = (e: SyntheticEvent) => {
    // 输入的验证码为4位时 发起登陆请求
    // 需要将e.target断言为HTMLInputElement 才能获取到value 否则ts报错：类型“EventTarget”上不存在属性“value”。ts(2339)
    let target = e.target as HTMLInputElement;
    if (target.value?.length === 4) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const res = api.User.getVerify();
    console.log(
      api,
      import.meta.env,
      import.meta.env.VITE_APP_TITLE,
      VITE_APP_TITLE
    );
  };

  return (
    <div className={styles.background}>
      <div className={styles.formWrap}>
        <h3 className={styles.title}>登录</h3>
        <Form className={styles.form} form={form}>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "*账号不能为空" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "*密码不能为空" }]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
          <div className={styles.verifyWrap}>
            <Form.Item
              className={styles.verifyFormItem}
              name="verify"
              rules={[{ required: true, message: "验证码不能为空" }]}
            >
              <Input placeholder="验证码" onKeyUp={onVerifyKeyUp} />
            </Form.Item>
            <img className={styles.verifyCount} src={verifyCountPng} />
          </div>
          <Button type="primary" className={styles.loginBtn}>
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}
