
import axios from "axios";

const instance = axios.create({
  baseURL: "https://full-stack-task-tracker-f4wp-backend.vercel.app", 
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
