import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";

import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";

import AuthModal from "./AuthModal";

import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";

import jwt_decode from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("");

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const { profile, setProfile } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("jwt-token")) {
      const token = window.localStorage.getItem("jwt-token");
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsAuthenticated(true);

      if (decoded.isAdmin === true) {
        navigate("/admin");
      }
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setProfile(null);

    //remove token from local storage
    window.localStorage.removeItem("jwt-token");

    navigate("/");
  };

  // Setting current screen width to state in real time
  const [width, setWidth] = useState(window.screen.width);
  window.addEventListener("resize", () => {
    setWidth(window.screen.width);
  });

  return (
    <Box py={[6]} px={[4, null, null, 12]} w="100%" display = "flex" style={{position:"sticky",top:0,zIndex:100,backgroundColor:"white"}}>
      <Box>
        <Heading color={"gray.700"}>HireGuru</Heading>
      </Box>
      <Box ml="auto">
        {
          // If user is not authenticated, show login/register buttons
          !isAuthenticated ? (
            <>
              <Button
                variant={"ghost"}
                colorScheme={"blue"}
                px={[4, null, null, 8]}
                py={[6]}
                borderRadius={8}
                mr="2"
                onClick={() => {
                  setModalType("login");
                  onOpen();
                }}
              >
                Login
              </Button>
              <Button
                variant={"solid"}
                colorScheme={"blue"}
                borderRadius={8}
                px={[4, null, null, 8]}
                py={[6]}
                boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.4);"}
                onClick={() => {
                  setModalType("register");
                  onOpen();
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {user && `Hi ${user.username}`}
              </MenuButton>
              <MenuList>
                {width < 768 ? (
                  user?.isAdmin === true ? (
                    <>
                      <MenuItem>
                        <Link to="/admin">Jobs</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/admin/applications">Applications</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/admin/logs">Logs</Link>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <Link to="/">All jobs</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/profile">My profile</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/applications">My applications</Link>
                      </MenuItem>
                    </>
                  )
                ) : null}

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )
        }
      </Box>
      <AuthModal isOpen={isOpen} onClose={onClose} type={modalType} />
    </Box>
  );
};

export default Nav;
