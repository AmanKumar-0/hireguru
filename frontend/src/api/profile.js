import axios from "axios";
import axiosInstance from "./index";
import { getAuthorizationHeader } from "./index";

// fetch my profile
export const getMyProfile = async () => {
  const response = await axiosInstance.get("/api/user/profile", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};

// create my profile
export const createMyProfile = async (profileData) => {
  const response = await axiosInstance.post("/api/user/profile", profileData, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const response= await axiosInstance.post(`/api/user/upload-file`,formData,{
    headers:{
      Authorization: getAuthorizationHeader(),
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
   
}

// export async function getFileContent(fileName) {
//   try {
//     // const response = await axiosInstance.get(`/api/user/${fileName}`, {
//     //   headers: {
//     //     Authorization: getAuthorizationHeader(),
//     //   },
//     //   responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
//     // });
//     // const temp4= new Uint8Array(response.data).buffer
//     // // Check if the response data is an ArrayBuffer
//     const response = await axios.get(fileName)
//     const responseType = response.data.blob()
//     const temp= new Blob([responseType],{type:"application/pdf"})
//     const temp2 =  URL.createObjectURL(temp);
//     return temp2

//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     throw error; // Rethrow the error for further handling in your application
//   }
// }


