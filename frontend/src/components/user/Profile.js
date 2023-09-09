import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  useToast,
  Skeleton,
  Divider,
  Tag,
  Link,
  Icon,
} from "@chakra-ui/react";

import ProfileForm from "./ProfileForm";

import { getFileContent, getMyProfile } from "../../api/profile";
import { useProfile } from "../../contexts/profileContext";
import { ToastConfig } from "../ToastConfig";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { BsLinkedin } from "react-icons/bs";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import { useUtil } from "../../contexts/utilContext";
import { saveAs } from "file-saver";
import PdfViewerComponent from "./PdfViewer";
// import { rotatePlugin } from '@react-pdf-viewer/rotate';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { profile, setProfile } = useProfile();
  const toast = useToast();

  const { width, height } = useWindowSize();
  const { runConfetti, setRunConfetti } = useUtil();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getMyProfile();
      setProfile(data.data);
      // if (data?.data?.attachments.length > 0) {
      //     const fetchedFile = await getFileContent(
      //       data?.data?.attachments[0]._id
      //     );
      //     setFileContent([fetchedFile]);
      // }
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
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (runConfetti) {
      setTimeout(() => {
        setRunConfetti(false);
      }, 12000);
    }
  }, [runConfetti]);

  return (
    <Box
      w={["100%", null, "45%"]}
      px={[4]}
      py={[6, null, null, 8]}
      my={[4]}
      mx={[0, null, 4]}
      // border={"1px solid #eeeeee"}
      borderRadius={8}
    >
      <Skeleton isLoaded={!loading}>
        <Box>
          <Heading color={"gray.600"} fontSize={["2xl", null, null, "3xl"]}>
            {profile === null ? (
              "Complete your profile now to get started 🚀"
            ) : (
              <>
                Yay{" "}
                <Box as={"span"} color="pink.400">
                  {profile?.user?.username}
                </Box>
                , you are all set 🎉
              </>
            )}
          </Heading>
          <Text color={"blue.500"} fontSize={["xl"]} mt={[2]}>
            {profile === null
              ? "Dont worry, you only need to do this once. "
              : "Your profile is complete. You can now head to the 'All jobs' section to apply for jobs."}
          </Text>
        </Box>
        <Box>
          {profile ? (
            <Box
              mt={[10]}
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

                  <Box display="flex" flexDirection={"column"} w="50%" mt={[4]}>
                    <Text color={"gray.300"}>MAJORS</Text>
                    <Text color={"gray.500"} fontWeight={"bold"}>
                      {profile?.education?.field}
                    </Text>
                  </Box>

                  <Box display="flex" flexDirection={"column"} w="50%" mt={[4]}>
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
                  w="100%"
                  my={[4]}
                  flexWrap={"wrap"}
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
                    <Link href={`${profile?.linkedinURL}`} color={"blue.400"}>
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
                    {/* {profile?.attachments.length > 0 && <iframe height="500px" src={profile?.attachments[0]._id} />} */}
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
            <ProfileForm />
          )}
        </Box>
      </Skeleton>
      <Confetti
        width={width - 20}
        height={height}
        tweenDuration={20000}
        run={runConfetti}
        recycle={false}
        numberOfPieces={400}
      />
    </Box>
  );
};

export default Profile;
