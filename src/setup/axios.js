import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: 'http://localhost:8081'
});

instance.defaults.withCredentials = true;

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    const status = error && error.response && error.response.status || 500;
    switch (status) {
        case 401:
            {
              if(window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                toast.error("Unauthorized");
              }
              return error.response.data
            }
        case 403:
            toast.error("Forbidden");
            return error.response.data
        case 404:
            toast.error("Not Found");
            return error.response.data
        default:
            toast.error("Internal Server Error");
            return error.response.data
    }
  });

  export default instance;