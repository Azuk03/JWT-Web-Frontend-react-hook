import React, { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Login = (props) => {
  const {user, loginContext} = useContext(UserContext);
  let history = useHistory();

  const [valueLogin, setvalueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleOnCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your email address or your phone number!");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password!");
      return;
    }

    let response = await LoginUser(valueLogin, password);
    if (response && +response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: {groupWithRoles, email, username}
      };

      localStorage.setItem("jwt",token);
      loginContext(data);
      history.push("/users");
      // window.location.reload();
    }

    if (response && +response.EC !== 0) {
      toast.error(response.EM);
    }
  };

  const handlePressEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if(user && user.isAuthenticated) {
      history.push('/');
    }
  },[])

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">JWT Website</div>
            <div className="detail">This website is a project to learn JWT</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">JWT Website</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email or phonenumber"
              value={valueLogin}
              onChange={(e) => setvalueLogin(e.target.value)}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleOnCreateNewAccount()}
              >
                Create your new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
