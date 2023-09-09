import axiosInstance from "./index";
import { getAuthorizationHeader } from "./index";

// apply for a job
export const applyForJob = async (applicationData) => {
  const response = await axiosInstance.post(
    "/api/user/application/apply",
    applicationData,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// get my applications
export const getMyApplications = async () => {
  const response = await axiosInstance.get(
    "/api/user/application/my-applications",
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// email applicant on applying for a job
export const sendEmailToApplicantUser = async (applicationId, data) => {
  const response = await axiosInstance.post(
    `/api/user/application/email/${applicationId}`,
    data,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// ADMIN ROUTES

// get all applications
export const getAllApplicationsAdmin = async () => {
  const response = await axiosInstance.get(
    "/api/admin/application/all-applications",
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// get applications for a job
export const getApplicationsForJobAdmin = async (jobId) => {
  const response = await axiosInstance.get(
    `/api/admin/application/job/${jobId}`,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// get single application
export const getSingleApplicationAdmin = async (applicationId) => {
  const response = await axiosInstance.get(
    `/api/admin/application/${applicationId}`,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// get admin logs
export const getLogsAdmin = async () => {
  const response = await axiosInstance.get("/api/admin/application/logs", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};

// select/reject an application
export const selectOrRejectApplicationAdmin = async (applicationId, data) => {
  const response = await axiosInstance.patch(
    `/api/admin/application/${applicationId}`,
    data,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// send email to applicant
export const sendEmailToApplicantAdmin = async (applicationId, data) => {
  const response = await axiosInstance.post(
    `/api/admin/application/email/${applicationId}`,
    data,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};
