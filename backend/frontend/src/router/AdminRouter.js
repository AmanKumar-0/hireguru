import React from "react";

import { Routes, Route } from "react-router-dom";

import AllJobsAdmin from "../components/admin/AllJobsAdmin";
import PageNotFound404 from "../components/PageNotFound404";
import JobDescriptionAdmin from "../components/admin/JobDescriptionAdmin";
import AllApplicationsAdmin from "../components/admin/AllApplicationsAdmin";
import JobApplicationAdmin from "../components/admin/JobApplicationAdmin";
import PostJob from "../components/admin/PostJob";
import ApplicationAdmin from "../components/admin/ApplicationAdmin";
import LogsAdmin from "../components/admin/LogsAdmin";

import { AdminPrivateRoute } from "./AdminPrivateRoute";

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AllJobsAdmin />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/job/:id"
          element={
            <AdminPrivateRoute>
              <JobDescriptionAdmin />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminPrivateRoute>
              <AllApplicationsAdmin />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/applications/:id"
          element={
            <AdminPrivateRoute>
              <ApplicationAdmin />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/applications/job/:id"
          element={
            <AdminPrivateRoute>
              <JobApplicationAdmin />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/post-job"
          element={
            <AdminPrivateRoute>
              <PostJob />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/logs"
          element={
            <AdminPrivateRoute>
              <LogsAdmin />
            </AdminPrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </>
  );
};

export default AdminRouter;
