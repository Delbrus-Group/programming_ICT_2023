import axios from "axios";

let accessToken = localStorage.getItem("access");
const options = {
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
};

accessToken ? (options.headers.Authorization = "Bearer " + accessToken) : null;
let instance = axios.create(options);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response.status === 401) {
      let refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const data = await axios.post(
            "http://127.0.0.1:8000/api/users/token/refresh",
            {
              refresh: refreshToken,
            }
          );

          let access = data.data.access;
          if (access) {
            localStorage.setItem("access", access);

            config.headers["Authorization"] = "Bearer " + access;
            return instance(config);
          }
        } catch (e) {
          console.log(e);
        }
      }

      localStorage.clear();
      return error;
    }
  }
);

const API = {
  login: (data) => {
    return instance.post("/users/login", data);
  },
  register: (data) => {
    return instance.post("/users/create", data);
  },
  sendCode: (data) => {
    return instance.post("/users/send_code", data);
  },
  getBalance: (data) => {
    return instance.get("/users/get_balance", data);
  },
  transfer: (data) => {
    return instance.post("/users/transfer", data);
  },
  getTransactions: (data) => {
    return instance.get("/users/get_transactions", data);
  },
  logout: () => {
    delete instance.defaults.headers["Authorization"];
  },
};
export default API;
