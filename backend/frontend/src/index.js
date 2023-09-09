import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";

// Fonts
import "./theme/styles.css";

////
import { AuthProvider } from "./contexts/authContext";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
