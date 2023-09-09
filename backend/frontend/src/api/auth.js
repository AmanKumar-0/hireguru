import axiosInstance from "./index";

export const register = async (username, password) => {
  const response = await axiosInstance.post("/api/auth/register", {
    username,
    password,
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axiosInstance.post("/api/auth/login", {
    username,
    password,
  });
  return response.data;
};
