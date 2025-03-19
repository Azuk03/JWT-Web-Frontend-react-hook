
import axios from '../setup/axios';

const registerNewRegister = (email, phone, username, password) => {
      return axios.post('api/v1/register', {email, phone, username, password})
  };

const LoginUser = (valueLogin, password) => {
    return axios.post('api/v1/login', {valueLogin, password});
}

const fetchAllUsers = (page, limit) => {
    return axios.get(`api/v1/user/read?page=${page}&limit=${limit}`);
}

const deleteAUser = (user) => {
    return axios.delete("api/v1/user/delete", {data: {id: user.id}});
}

const fetchGroup = () => {
    return axios.get(`api/v1/group/read`);
}

const createNewUser = (userData) => {
    return axios.post("api/v1/user/create", {...userData})
}

const updateCurrentUser = (userData) => {
    return axios.put("api/v1/user/update", {...userData})
}

const getUserAccount = () => {
    return axios.get("api/v1/account");
}

const LogoutUser = () => {
    return axios.post("api/v1/logout");
}

export {
    registerNewRegister,
    LoginUser,
    fetchAllUsers,
    deleteAUser,
    fetchGroup,
    createNewUser,
    updateCurrentUser,
    getUserAccount,
    LogoutUser
}