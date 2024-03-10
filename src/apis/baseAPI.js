import axios from "axios";
import { USER_LOGIN } from "../redux/types/UserType";

const baseAPI = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NSIsIkhldEhhblN0cmluZyI6IjI0LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjUwODgwMDAwMCIsIm5iZiI6MTY4Nzg4NTIwMCwiZXhwIjoxNzE2NjU2NDAwfQ.HsoestvkIN5Kub3jnAr8UddrPugJcxCsAm4QfMi4ZbU",
  },
});
baseAPI.interceptors.request.use(
  (request) => {
    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
    if (userLogin) {
      request.headers.Authorization = `Bearer ${userLogin.accessToken}`;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);
baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(USER_LOGIN);
      window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default baseAPI;
