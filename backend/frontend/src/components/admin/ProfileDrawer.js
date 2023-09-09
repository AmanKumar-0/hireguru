import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  Text,
  Heading,
  Box,
  Divider,
  Tag,
  Icon,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Document, Page } from "react-pdf";

import { BsLinkedin } from "react-icons/bs";

import { useProfile } from "../../contexts/profileContext";

import eyes from "../../assets/eyes.gif";
import { ToastConfig } from "../ToastConfig";
import { getFileContent } from "../../api/profile";

const ProfileDrawer = ({ isOpen, onClose, onOpen }) => {
  const toast = useToast();
  const { profile, setProfile } = useProfile();

  // const fetchProfile = async () => {
  //   try {
  //     if (profile.attachments.length > 0) {
  //         const fetchedFile = await getFileContent(
  //           profile.attachments[0]._id
  //         );
  //         setFileContent([fetchedFile]);
  //     }
  //   } catch (error) {
  //     toast(
  //       ToastConfig("Error",error.message,"error")
  //     )
  //   }
  // };

  // useEffect(() => {
  //     fetchProfile();
  // }, []);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay backgroundColor={"rgba(0,0,0,0.2)"} />
        <DrawerContent pl={[2]}>
          <DrawerCloseButton size={"lg"} />
          <DrawerHeader>
            <Heading color={"gray.600"} fontSize={["2xl", null, null, "3xl"]}>
              Applicant profile
            </Heading>
          </DrawerHeader>

          <DrawerBody mt={[6]}>
            <Box>
              {profile ? (
                <Box
                  d={"flex"}
                  flexDirection={"column"}
                  justifyContent={"flex-start"}
                  w={"100%"}
                >
                  <Box w={"100%"}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      GENERAL
                    </Text>

                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      w="100%"
                      my={[4]}
                    >
                      <Box display="flex" flexDirection={"column"} w="50%">
                        <Text color={"gray.300"}>FIRST NAME</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.name?.first}
                        </Text>
                      </Box>

                      <Box display="flex" flexDirection={"column"} w="50%">
                        <Text color={"gray.300"}>LAST NAME</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.name?.last}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box w={"100%"} mt={[10]}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      CONTACT
                    </Text>

                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      w="100%"
                      my={[4]}
                    >
                      <Box display="flex" flexDirection={"column"} w="50%">
                        <Text color={"gray.300"}>EMAIL ADDRESS</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.contact?.email}
                        </Text>
                      </Box>

                      <Box display="flex" flexDirection={"column"} w="50%">
                        <Text color={"gray.300"}>PHONE NUMBER</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.contact?.phone}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box w={"100%"} mt={[10]}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      EXPERIENCE
                    </Text>

                    {profile?.experience.map((exp, index) => (
                      <Box
                        display="flex"
                        justifyContent={"flex-start"}
                        flexWrap={"wrap"}
                        w="100%"
                        my={[4]}
                        key={index}
                      >
                        <Box display="flex" flexDirection={"column"} w="50%">
                          <Text color={"gray.300"}>COMPANY</Text>
                          <Text color={"gray.500"} fontWeight={"bold"}>
                            {exp.company}
                          </Text>
                        </Box>

                        <Box display="flex" flexDirection={"column"} w="50%">
                          <Text color={"gray.300"}>ROLE</Text>
                          <Text color={"gray.500"} fontWeight={"bold"}>
                            {exp.role}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection={"column"}
                          w="50%"
                          mt={[4]}
                        >
                          <Text color={"gray.300"}>START DATE</Text>
                          <Text color={"gray.500"} fontWeight={"bold"}>
                            {exp.startDate}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection={"column"}
                          w="50%"
                          mt={[4]}
                        >
                          <Text color={"gray.300"}>END DATE</Text>
                          <Text color={"gray.500"} fontWeight={"bold"}>
                            {exp.endDate}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection={"column"}
                          w="100%"
                          mt={[4]}
                        >
                          <Text color={"gray.300"}>DESCRIPTION</Text>
                          <Text color={"gray.500"} fontWeight={"bold"}>
                            {exp.description}
                          </Text>
                        </Box>
                        <Divider mt={[4]} />
                      </Box>
                    ))}
                  </Box>

                  <Box w={"100%"} mt={[10]}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      EDUCATION
                    </Text>

                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      w="100%"
                      my={[4]}
                    >
                      <Box display="flex" flexDirection={"column"} w="50%">
                        <Text color={"gray.300"}>UNIVERSITY</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.education?.university}
                        </Text>
                      </Box>

                      <Box display="flex" flexDirection={"column"} w="50%">
                        <Text color={"gray.300"}>DEGREE</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.education?.degree}
                        </Text>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection={"column"}
                        w="50%"
                        mt={[4]}
                      >
                        <Text color={"gray.300"}>MAJORS</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.education?.field}
                        </Text>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection={"column"}
                        w="50%"
                        mt={[4]}
                      >
                        <Text color={"gray.300"}>YEAR OF GRADUATION</Text>
                        <Text color={"gray.500"} fontWeight={"bold"}>
                          {profile?.education?.yearOfGraduation}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box w={"100%"} mt={[10]}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      SKILLS
                    </Text>

                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      flexWrap={"wrap"}
                      w="100%"
                      my={[4]}
                    >
                      {profile?.skills.map((skill, index) => (
                        <Tag
                          key={index}
                          variant={"outline"}
                          colorScheme={"blue"}
                          mr={[2]}
                          mb={[2]}
                          size={"lg"}
                        >
                          {skill}
                        </Tag>
                      ))}
                    </Box>
                  </Box>

                  <Box w={"100%"} mt={[10]}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      PROFILES
                    </Text>

                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      w="100%"
                      my={[4]}
                    >
                      <Box display="flex" flexDirection={"column"} w="100%">
                        <Text color={"gray.300"}>
                          LINKEDIN <Icon as={BsLinkedin} />{" "}
                        </Text>
                        <Link
                          href={`${profile?.linkedinURL}`}
                          color={"blue.400"}
                        >
                          {profile?.linkedinURL}
                        </Link>
                      </Box>
                    </Box>
                  </Box>

                  <Box w={"100%"} mt={[10]}>
                    <Text color={"blue.500"} fontWeight={"bold"}>
                      Resume
                    </Text>

                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      w="100%"
                      my={[4]}
                    >
                      <Box display="flex" flexDirection={"column"} w="100%">
                        <Text color={"gray.300"}>Resume</Text>
                        {/* 3.10.111 */}
                        {/* {fileContent && <PdfViewerComponent pdfData={fileContent} />} */}
                        {/* {fileContent && <iframe height="50vh" src={fileContent} />} */}
                        {/* {profile.attachments.length > 0 && <iframe height="50vh" src={ profile.attachments[0]._id} />} */}
                        {profile.attachments.length > 0 && (
                          <iframe
                            title="PDF Viewer"
                            src={`https://docs.google.com/gview?url=${encodeURIComponent(
                              profile.attachments[0]._id
                            )}&embedded=true`}
                            style={{
                              width: "100%",
                              height: "50vh",
                              border: "none",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent={"center"}
                  flexDirection={"column"}
                  textAlign={"center"}
                  mt={[10]}
                >
                  <img src={eyes} width={"50px"} style={{ margin: "auto" }} />
                  <Text color={"gray.400"} mt={[1]}>
                    The profile you are looking for does not exist
                  </Text>
                </Box>
              )}
            </Box>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
