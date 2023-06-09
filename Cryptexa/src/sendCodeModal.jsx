import { Input, Modal } from "antd";
import "./index.css";
import { useState } from "react";
import API from "./API";
import { useNavigate } from "react-router-dom";

const ModalSendCode = ({ isModalOpen, setIsModalOpen, phone, password }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleOk = () => {
    API.register({
      mobile_phone: phone,
      sms_code: code,
      password: password,
    }).then((e) => {
      localStorage.setItem("access", e.data.access);
      localStorage.setItem("refresh", e.data.refresh);
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    });
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="SMS code"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={code} onChange={(e) => setCode(e.target.value)} />
      </Modal>
    </>
  );
};

export default ModalSendCode;
