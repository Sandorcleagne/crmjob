import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import PopupSuccess from "./Atom/Popup/Popup.js";
import { host } from "./Host";
import { login } from "./Redux/Reducer/AuthReducer.js";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import logo from "./Image/login-logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { loginApi } from "./API/LoginApi.js";
import swal from "sweetalert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Sucess, setSucess] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["LOGIN"]);
  const navigate = useNavigate();
  const SubmitLogin = async (e) => {
    e.preventDefault();
    login(email, password, setCookie, navigate);
  };
  useEffect(() => {
    removeCookie("login");
    removeCookie("token");
  }, []);
  return (
    <main className="main-login d-flex">
      {Sucess ? <PopupSuccess /> : ""}

      <Form className="login-form" onSubmit={SubmitLogin}>
        <div className="panel_form  text-center">
          <img src={logo} width="180" className="login-logo" />
          <h4 className="mt-4 font-weight-bold welcome mb-1">
            Hi, Welcome Back
          </h4>
          <p className="font-weight-medium text-secondary">
            Enter your credentials to continue
          </p>
          <h1 className="login-heading">Login In</h1>

          <Form.Group className="mb-4 mt-4">
            <TextField
              fullWidth={true}
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
              type="email"
            />
          </Form.Group>

          <Form.Group className="mb-4 pt-1">
            <TextField
              fullWidth={true}
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
              type="password"
            />
          </Form.Group>

          <Button
            variant="contained"
            type="submit"
            disableElevation
            sx={{
              height: "50px",
              fontWeight: "700",
              fontFamily: '"Quicksand", sans-serif',
              fontSize: "18px",
              backgroundColor: "#2a6ca8",
              "&:hover": {
                backgroundColor: "#115496",
              },
            }}
            size="large"
            fullWidth={true}
          >
            SUBMIT
          </Button>

          <div className="forgot">
            <span>
              Not have account?{" "}
              <a href="#" className="ms-2 font-weight-bold text-dark">
                Forgot password?
              </a>
            </span>
          </div>
        </div>
      </Form>
    </main>
  );
}

export default Login;
