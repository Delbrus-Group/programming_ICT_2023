import { Avatar, Button, List, Skeleton, Typography, message } from "antd";
import API from "./API";
import { useEffect, useState } from "react";
import TransferModal from "./transferModal";
import { PoweroffOutlined } from "@ant-design/icons";
import "./home.css";
import { useNavigate } from "react-router-dom";
import TransactionTable from "./TransactionTable";
const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicker, setCurrentTicker] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isBalanceActual, setIsBalanceActual] = useState(false);
  const [tableData, setTableData] = useState([
    {
      timestamp: "",
      user_from: "",
      user_to: "",
      count: "",
      ticker: "",
      outcome: true,
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isBalanceActual) {
      API.getBalance().then((r) => {
        const data = r?.data;
        const tempData = [];
        tempData.push({
          tiker: "btc",
          balance: data?.btc_balance,
          logo: "../src/assets/btc.svg",
        });
        tempData.push({
          tiker: "bnb",
          balance: data?.bnb_balance,
          logo: "../src/assets/bnb.svg",
        });
        tempData.push({
          tiker: "usdt",
          balance: data?.usdt_balance,
          logo: "../src/assets/usdt.svg",
        });
        console.log(data?.phone_number, phoneNumber, "1");
        setPhoneNumber(data?.phone_number);
        setList(tempData);
        setInitLoading(false);
        setIsBalanceActual(false);
      });
    }
  }, [isBalanceActual]);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  });
  useEffect(() => {
    if (!isBalanceActual) {
      API.getTransactions({}).then((e) => {
        const data = e.data.transactions.map((el, i) => {
          el.key = i;
          return el;
        });
        return setTableData(data);
      });
    }
  }, [isBalanceActual]);

  console.log(phoneNumber, "2");
  return (
    <div className="home_container">
      {contextHolder}
      <div className="home_avatar_container">
        <Typography.Title level={2} style={{ margin: 0 }}>
          CRYPTEXA
        </Typography.Title>
        <div className="home_avatar">
          <Typography.Title level={5} style={{ margin: 0 }}>
            {`+${phoneNumber}`}
          </Typography.Title>
          <Button
            className="home_avatar_button"
            type="primary"
            shape="circle"
            icon={<PoweroffOutlined />}
            onClick={() => {
              localStorage.clear();
              API.logout();
              navigate("/");
            }}
          />
        </div>
      </div>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Wallet
      </Typography.Title>
      <Skeleton avatar title={false} loading={initLoading} active>
        <List
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => {
                    setIsModalOpen(true);
                    setCurrentTicker(item.tiker);
                  }}
                >
                  transfer
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.logo} />}
                title={item.tiker}
                description={item.balance}
              />
            </List.Item>
          )}
        ></List>
      </Skeleton>
      <Typography.Title level={4} style={{ marginBottom: "40px" }}>
        Transactions
      </Typography.Title>
      <Skeleton avatar title={false} loading={initLoading} active>
        <TransactionTable tableData={tableData} />
      </Skeleton>
      <TransferModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentTicker={currentTicker}
        messageApi={messageApi}
        setIsBalanseActual={setIsBalanceActual}
      />
    </div>
  );
};
export default Home;
