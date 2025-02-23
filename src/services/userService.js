import axios from "axios";

const registerNewRegister = (email, phone, username, password) => {
      return axios.post('http://localhost:8081/api/v1/register', {email, phone, username, password})
  };

export {
    registerNewRegister
}