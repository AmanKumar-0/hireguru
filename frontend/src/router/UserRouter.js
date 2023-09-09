import React from "react";

// Components
import PageNotFound404 from "../components/PageNotFound404";
import Profile from "../components/user/Profile";
import AllJobs from "../components/user/AllJobs";
import JobDescription from "../components/user/JobDescription";
import MyApplications from "../components/user/MyApplications";

// Router
import { Routes, Route } from "react-router-dom";

// ProtectedRoute
import { UserPrivateRoute } from "./UserPrivateRoute";

const UserRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="/job/:id" element={<JobDescription />} />
        <Route
          path="/profile"
          element={
            <UserPrivateRoute>
              <Profile />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <UserPrivateRoute>
              <MyApplications />
            </UserPrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </>
  );
};

export default UserRouter;
