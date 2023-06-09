import moment from "moment/moment";
import "./index.css";
import { Table, Tag } from "antd";

const columns = [
  {
    title: "Sender",
    dataIndex: "user_from",
    render: (_, { user_from }) => `+${user_from}`,
  },
  {
    title: "Receiver",
    dataIndex: "user_to",
    render: (_, { user_to }) => `+${user_to}`,
  },
  {
    title: "Count",
    dataIndex: "count",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.count - b.count,
    render: (_, { outcome, count }) => {
      let color = outcome ? "red" : "green";
      return (
        <>
          <Tag color={color}>{outcome ? `${count}` : `+${count}`}</Tag>
        </>
      );
    },
  },
  {
    title: "Ticker",
    dataIndex: "ticker",
    filters: [
      {
        text: "bnb",
        value: "bnb",
      },
      {
        text: "btc",
        value: "btc",
      },
      {
        text: "usdt",
        value: "usdt",
      },
    ],
    onFilter: (value, record) => record.ticker.indexOf(value) === 0,
    render: (_, { ticker }) => {
      let color =
        ticker === "bnb" ? "orange" : ticker === "btc" ? "yellow" : "green";
      return (
        <>
          <Tag color={color} key={ticker}>
            {ticker.toUpperCase()}
          </Tag>
        </>
      );
    },
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    render: (_, { timestamp }) =>
      moment(timestamp).format("MM/DD/YYYY hh:mm a"),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TransactionTable = ({ tableData }) => (
  <Table columns={columns} dataSource={tableData} onChange={onChange} />
);

export default TransactionTable;
