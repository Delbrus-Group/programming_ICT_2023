import { Button, Checkbox, Form, Input } from "antd";
import API from "./API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  console.log(
    { mobile_phone: "+375292312339", password: "asdasdsadsad" },
    { mobile_phone: "375445331154", password: "123321" }
  );
  const onSubmit = () => {
    API.login({
      mobile_phone: phone,
      password: password,
    }).then((e) => {
      localStorage.setItem("access", e.data.access);
      localStorage.setItem("refresh", e.data.refresh);
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onSubmitCapture={onSubmit}
    >
      <Form.Item
        label="Phone"
        name="Phone"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
