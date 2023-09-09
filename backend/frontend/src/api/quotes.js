import axiosInstance from "./index";

// fetch quotes
export const fetchQuotes = async () => {
  const response = await axiosInstance.get("https://type.fit/api/quotes");
  return response.data;
};
