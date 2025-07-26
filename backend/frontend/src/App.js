import React from "react";

import { AuthProvider } from "./contexts/authContext";
import { JobsProvider } from "./contexts/jobsContext";
import { ProfileProvider } from "./contexts/profileContext";
import { UtilProvider } from "./contexts/utilContext";


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
