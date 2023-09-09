import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

// Routers
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";

// Context
import { useAuth } from "../contexts/authContext";

// Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const BaseLayout = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Box
        w="100%"
        display = "flex"
        justifyContent={"center"}
        flexDirection={["column"]}
      >
        <Nav />
        <Box
          w="100%"
          display = "flex"
          justifyContent={"flex-start"}
          flexDirection={["column", null, "row"]}
        >
          <Sidebar />
          {!isAuthenticated || (isAuthenticated && user && !user.isAdmin) ? (
            <UserRouter />
          ) : isAuthenticated && user && user.isAdmin ? (
            <AdminRouter />
          ) : null}

          <RightPanel />
        </Box>
      </Box>
    </Router>
  );
};

export default BaseLayout;
