import { useState } from "react";
import "./index.css";
import { Button, Form, Input, Modal } from "antd";
import API from "./API";

const TransferModal = ({
  setIsModalOpen,
  isModalOpen,
  currentTicker,
  messageApi,
  setIsBalanseActual,
}) => {
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState("");

  const handleOk = () => {
    API.transfer({
      mobile_phone: phone,
      count: count,
      ticker: currentTicker,
    }).then((r) => {
      r?.status !== 200
        ? messageApi.open({
            type: "error",
            content: "Error",
          })
        : messageApi.open({
            type: "success",
            content: "All success",
          });
      handleCancel();
      setIsBalanseActual();
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={`Transfer ${currentTicker.toUpperCase()}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
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
            label="Count"
            name="number"
            type="number"
            rules={[
              {
                required: true,
                message: "Please input count!",
              },
            ]}
          >
            <Input
              value={count}
              onChange={(e) => setCount(e.target.value)}
              addonAfter={currentTicker.toUpperCase()}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TransferModal;
