import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

// Fonts
import "./theme/styles.css";

////
import { AuthProvider } from "./contexts/authContext";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
