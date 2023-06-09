import { Button, Form, Input } from "antd";
import API from "./API";
import { useState } from "react";
import ModalSendCode from "./sendCodeModal";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    showModal();
    API.sendCode({
      mobile_phone: phone,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
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
              message: "Please input your tel!",
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
      <ModalSendCode
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        password={password}
        phone={phone}
      />
    </>
  );
};
export default SignUp;
