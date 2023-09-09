import axiosInstance from "./index";
import { getAuthorizationHeader } from "./index";

// get all jobs
export const getAllJobs = async () => {
  const response = await axiosInstance.get("/api/user/job/all-jobs");
  return response.data;
};

// get specific job
export const getSpecificJob = async (jobId) => {
  const response = await axiosInstance.get(`/api/user/job/${jobId}`);
  return response.data;
};

// ADMIN ROUTES

// get all jobs
export const getAllJobsAdmin = async () => {
  const response = await axiosInstance.get("/api/admin/job/all-jobs", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};

// get specific job
export const getSpecificJobAdmin = async (jobId) => {
  const response = await axiosInstance.get(`/api/admin/job/${jobId}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};

// delete job
export const deleteJobAdmin = async (jobId) => {
  const response = await axiosInstance.delete(
    `/api/admin/job/delete-job/${jobId}`,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// post job
export const postJobAdmin = async (jobData) => {
  const response = await axiosInstance.post(
    "/api/admin/job/post-job",
    jobData,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};
