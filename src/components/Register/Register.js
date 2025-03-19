import React, { useState } from "react";
import { useEffect } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { registerNewRegister } from "../../services/userService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setcomfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  }
  const [objCheckInput,setobjCheckInput] = useState(defaultValidInput);

  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const isValidateInputs = () => {
    setobjCheckInput(defaultValidInput);
    if(!email) {
      toast.error("Email is required!")
      setobjCheckInput({...defaultValidInput, isValidEmail: false});
      return false;
    }

    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regexEmail.test(email)) {
      toast.error("Please enter a valid email!");
      setobjCheckInput({...defaultValidInput, isValidEmail: false});
      return false;
    }

    if(!phone) {
      toast.error("Phone is required!")
      return false;
    }

    let regexPhone = /^(0[3|5|7|8|9])([0-9]{8})$/;
    if(!regexPhone.test(phone)) {
      toast.error("Please enter a valid phone number!");
      return false;
    }

    if(!password) {
      toast.error("Password is required!")
      return false;
    }

    if(password !== confirmPassword) {
      toast.error("Your re-enter password is not same with password!");
      return false;
    }

    return true;
  }

  const handleRegister = async () => {
    let check = isValidateInputs();
    if(check === true) {
      let responseData = await registerNewRegister(email, phone, username, password);
      if(+responseData.EC === 0) {
        toast.success(responseData.EM);
        history.push("/login");
      } else {
        toast.error(responseData.EM);
      }
    }
  };

  // useEffect(() => {
  //   axios.get("http://localhost:8081/api/test-api").then(data => {console.log("CHeck api: ", data)})
  // },[])

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">JWT Website</div>
            <div className="detail">This website is a project to learn JWT</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">JWT Website</div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className={objCheckInput.isValidPhone ? "form-control" : "form-control is-invalid"}
                placeholder="Phonenumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"}
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password</label>
              <input
                type="password"
                className={objCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"}
                placeholder="Re-enter password..."
                value={confirmPassword}
                onChange={(e) => setcomfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already have an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
