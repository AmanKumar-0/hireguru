import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  useDisclosure,
  Heading,
  Text,
} from "@chakra-ui/react";

import { register, login } from "../api/auth";
import { ToastConfig } from "./ToastConfig";
import { useAuth } from "../contexts/authContext";
import { useUtil } from "../contexts/utilContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, type }) => {
  const [modalType, setModalType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const { tabIndex, setTabIndex } = useUtil();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setModalType(type);
  }, [type]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (modalType === "register") {
      try {
        setBtnLoading(true);
        const data = await register(username, password);
        
        toast(
          ToastConfig(
            "Account created successfully",
            "Now login to continue",
            "success"
          )
        );
        setModalType("login");
        setUsername("");
        setPassword("");
      } catch (error) {
        
        toast(
          ToastConfig(
            "Error",
            error.response
              ? error.response.data.message
              : "Backend service unavailable",
            "error"
          )
        );
      }
    } else if (modalType === "login") {
      try {
        setBtnLoading(true);
        const data = await login(username, password);
        

        // Decode jwt
        const decoded = jwt_decode(data.data);
        

        // Setting jwt in local storage
        window.localStorage.setItem("jwt-token", data.data);

        // Setting up state
        setIsAuthenticated(true);
        setUser(decoded);

        toast(ToastConfig("Login successful", "Welcome back!", "success"));

        // change sidebar tab index
        if (decoded.isAdmin === false) {
          setTabIndex(2);
          navigate("/profile");
        }

        if (decoded.isAdmin === true) {
          setTabIndex(0);
          navigate("/admin");
          toast(ToastConfig("Admin Login Detected", "👽👽👽", "info"));
        }

        onClose();
        setUsername("");
        setPassword("");
      } catch (error) {
        
        toast(
          ToastConfig(
            "Error",
            error.response
              ? error.response.data.message
              : "Backend service unavailable",
            "error"
          )
        );
      }
    }
    setBtnLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{modalType === "register" ? "Register" : "Login"}</Text>
        </ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setUsername("");
            setPassword("");
          }}
        />
        <ModalBody
          p={[12]}
          display = "flex"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          {/* Greet text */}
          <Heading fontSize={["3xl"]}>
            {modalType === "register"
              ? "Create an account to continue"
              : "Welcome back, Log in to continue"}
          </Heading>

          {/* Toggle modal type */}
          {modalType === "register" ? (
            <Text fontSize={["md"]} display = "flex" mt={[2]}>
              Have an account ?{" "}
              <Text
                ml={[2]}
                color={"pink.400"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setModalType("login");
                  setUsername("");
                  setPassword("");
                }}
              >
                Login
              </Text>
            </Text>
          ) : (
            <Text fontSize={["md"]} display = "flex" mt={[2]}>
              Don't have an account ?{" "}
              <Text
                ml={[2]}
                color={"pink.400"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setModalType("register");
                  setUsername("");
                  setPassword("");
                }}
              >
                Register
              </Text>
            </Text>
          )}

          {/* Form */}
          <form onSubmit={handleAuth}>
            <FormControl mt={[10]}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="Username"
                value={username}
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
                  value={password}
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
                isLoading={btnLoading}
              >
                {modalType === "register" ? "Create an account" : "Login"}
              </Button>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
