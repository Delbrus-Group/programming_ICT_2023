import { Typography } from "antd";
import "./App.css";

import Login from "./login";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/home");
    }
  });
  return (
    <>
      <div className="app_container">
        <Typography.Title>{isLogin ? "Login" : "Register"}</Typography.Title>
        {isLogin ? <Login /> : <SignUp />}
        <Typography.Link onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Dont have account create now !" : "Have an account ?"}
        </Typography.Link>
      </div>
    </>
  );
}

export default App;
