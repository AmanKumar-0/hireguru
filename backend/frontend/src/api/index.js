import axios from "axios";

export const getToken = () => {
  if (localStorage.getItem("jwt-token")) {
    return localStorage.getItem("jwt-token");
  } else {
    return null;
  }
};

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const axiosInstance = axios.create({
  // baseURL: "https://proud-red-kit.cyclic.app/",
  baseURL: "https://hireguru.vercel.app/",
  headers: {
    Authorization: getAuthorizationHeader(),
  },
});

export default axiosInstance;
