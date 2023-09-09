import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { register } from "../api/auth";
import { ToastConfig } from "./ToastConfig";

import AuthModal from "./AuthModal";

const AuthForm = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const { onClose } = useDisclosure();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (type === "register") {
      try {
        const data = await register(username, password);
        toast(
          ToastConfig("Success", "Account created successfully", "success")
        );
        onClose();
      } catch (error) {
        toast(ToastConfig("Error", error.response.data.message, "error"));
      }
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <AuthModal onClose={onClose} />
      <FormControl mt={[10]}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password field */}
        <FormLabel htmlFor="Password" mt={[4]}>
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          type="submit"
          mt={[4]}
          w="100%"
          variant={"solid"}
          colorScheme={"blue"}
          py={[6]}
          boxShadow={"0px 10px 40px rgba(66, 153, 225, 0.4)"}
        >
          {type === "register" ? "Create an account" : "Login"}
        </Button>
      </FormControl>
    </form>
  );
};

export default AuthForm;
