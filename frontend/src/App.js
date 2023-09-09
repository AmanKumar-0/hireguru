import React, { useEffect } from "react";
import { Heading, Box } from "@chakra-ui/react";

import { AuthProvider } from "./contexts/authContext";
import { JobsProvider } from "./contexts/jobsContext";
import { ProfileProvider } from "./contexts/profileContext";
import { UtilProvider } from "./contexts/utilContext";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import AllJobs from "./components/user/AllJobs";
import RightPanel from "./components/RightPanel";

import BaseLayout from "./router/BaseLayout";

function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <ProfileProvider>
          <UtilProvider>
            <BaseLayout />
          </UtilProvider>
        </ProfileProvider>
      </JobsProvider>
    </AuthProvider>
  );
}

export default App;
