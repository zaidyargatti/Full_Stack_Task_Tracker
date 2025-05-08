
import axios from "axios";

const instance = axios.create({
  baseURL: "https://full-stack-task-tracker-tdxc.onrender.com", 
  withCredentials:true
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
