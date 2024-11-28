// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// // Chakra UI
// import { ChakraProvider } from "@chakra-ui/react";
// import { BrowserRouter } from "react-router-dom";
// import theme from "./theme";

// // Fonts
// import "./theme/styles.css";

// ////
// import { AuthProvider } from "./contexts/authContext";

// ReactDOM.render(
//   <ChakraProvider theme={theme}>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//   </ChakraProvider>,
//   document.getElementById("root")
// );
import ReactDOM from "react-dom/client"; // Use createRoot from react-dom/client
import App from "./App";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";

// Fonts
import "./theme/styles.css";

import { AuthProvider } from "./contexts/authContext";
import { StrictMode } from "react";

// Create a root container
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
