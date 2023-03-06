/*
 * Author  Vincy.Li
 * Date  2023-02-20 17:03:24
 * LastEditors  Vincy.Li
 * LastEditTime  2023-03-03 14:44:43
 * Description 登陆页面
 */
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Alert } from "antd";
import { useEffect, useState, type SyntheticEvent } from "react";
import JSEncrypt from "jsencrypt/lib/index.js";
const encryptor = new JSEncrypt();

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [verifyCode, setVerifyCode] = useState({ uuid: "", captchaBase64: "" }); // 验证码图片

  useEffect(() => {
    getVerify();
    getPublicKey();
  }, []);

  const getVerify = async () => {
    const res = await api.User.getVerify();
    if (res && res?.status === "SUCCESS") {
      setVerifyCode(res.data);
    }
  };

  const getPublicKey = async () => {
    const res = await api.User.getPublicKey();
    if (res && res?.status === "SUCCESS") {
      localStorage.setItem("do_pb_ky", res.data);
    }
  };

  const onVerifyKeyUp = (e: SyntheticEvent) => {
    // 输入的验证码为4位时 发起登陆请求
    // 需要将e.target断言为HTMLInputElement 才能获取到value 否则ts报错：类型“EventTarget”上不存在属性“value”。ts(2339)
    let target = e.target as HTMLInputElement;
    if (target.value?.length === 4) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // 报错类型FormInstance<any>上不存在属性getFieldsValue 没找到准确类型 断言为any暂时解决
    const { getFieldsValue, validateFields } = form as any;
    validateFields()
      .then(async (values: any) => {
        const userName = values?.userName;
        const password = values?.password;

        const publicKey = localStorage.getItem("do_pb_ky") || "";
        encryptor.setPublicKey(publicKey);
        const pass = encryptor.encrypt(password);
        const params = {
          loginName: userName,
          password: pass,
          verifyCode: values.verify,
          uuid: verifyCode.uuid,
        };

        const res = await api.User.login(params);
        if (res && res.status === "SUCCESS") {
          localStorage.setItem("do_jwt_Bearer", res.data);
          const encryptUserName = window.btoa(encodeURIComponent(userName));
          localStorage.setItem("do_user_real_name", encryptUserName);
          // 跳转到首页
          navigate("/home");
          // window.location.herf('')
        } else {
          // 登陆失败 刷新验证码
          getVerify();
        }
      })
      .catch((error: string[]) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.background}>
      <div className={styles.formWrap}>
        <h3 className={styles.title}>登录</h3>
        <Form
          className={styles.form}
          form={form}
          validateTrigger={["onChange"]}
        >
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
            <img
              className={styles.verifyCount}
              src={verifyCode.captchaBase64}
              onClick={getVerify}
            />
          </div>
          <Button
            type="primary"
            className={styles.loginBtn}
            onClick={handleSubmit}
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}
