import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Tag,
  UnorderedList,
  ListItem,
  useToast,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  ChevronLeftIcon,
  DeleteIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";

import { useJobs } from "../../contexts/jobsContext";
import { useUtil } from "../../contexts/utilContext";
import { getSpecificJobAdmin } from "../../api/jobs";
import { deleteJobAdmin } from "../../api/jobs";
import { ToastConfig } from "../ToastConfig";

import eyes from "../../assets/eyes.gif";

const JobDescriptionAdmin = () => {
  const { selectedJob, setSelectedJob } = useJobs();
  const jobId = window.location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tabIndex, setTabIndex } = useUtil();

  const fetchSpecificJob = async () => {
    try {
      setLoading(true);
      const data = await getSpecificJobAdmin(jobId);
      setSelectedJob(data.data);
      
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
    fetchSpecificJob();
    window.scrollTo(0, 0);
    setTabIndex(0);
  }, []);

  const handleDeleteJob = async () => {
    // verify admin using admin tpin
    // const TPIN = window.prompt("Enter Admin TPIN to proceed 👽", "");
    // if (TPIN !== process.env.REACT_APP_ADMIN_TPIN) {
    //   toast(ToastConfig("Error", "Invalid TPIN", "error"));
    //   return;
    // }

    try {
      setBtnLoading(true);
      const data = await deleteJobAdmin(jobId);
      toast(ToastConfig("Success", "Job deleted successfully", "success"));
      setSelectedJob(null);
      navigate("/admin");
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
    setBtnLoading(false);
  };

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
      <ChakraLink as={Link} to="/admin" color={"blue.400"} fontWeight={"bold"}>
        <ChevronLeftIcon /> Go back to all jobs
      </ChakraLink>
      <Skeleton isLoaded={!loading}>
        {selectedJob ? (
          <Box display = "flex" flexDirection={"column"}>
            <Box
              display = "flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={[4]}
            >
              <Box display = "flex" flexDirection={"column"}>
                <Heading
                  color={"gray.600"}
                  fontSize={["2xl", null, null, "3xl"]}
                >
                  {selectedJob?.role}
                </Heading>

                <Text color={"gray.200"}>Job ID: {selectedJob?._id}</Text>
              </Box>

              <Tag backgroundColor={"blue.400"} color={"white"} opacity={0.6}>
                {selectedJob?.tag}
              </Tag>
            </Box>

            <Box
              display = "flex"
              justifyContent={"space-between"}
              py={[4, null, null, 6]}
              px={[4, null, null, 10]}
              mt={[6]}
              border="1px"
              borderColor="gray.100"
              borderRadius={8}
            >
              <Box display = "flex" flexDirection={"column"}>
                <Text color={"gray.300"}>LOCATION</Text>
                <Text color={"gray.500"} fontWeight={"bold"}>
                  {selectedJob?.location}
                </Text>
              </Box>

              <Box display = "flex" flexDirection={"column"}>
                <Text color={"gray.300"}>SALARY</Text>
                <Text color={"gray.500"} fontWeight={"bold"}>
                  {selectedJob?.salary}
                </Text>
              </Box>

              <Box display = "flex" flexDirection={"column"}>
                <Text color={"gray.300"}>EXPERIENCE</Text>
                <Text
                  color={"gray.500"}
                  fontWeight={"bold"}
                  textAlign={"right"}
                >
                  {selectedJob?.duration}
                </Text>
              </Box>
            </Box>

            <Box display = "flex" flexDirection={"column"} mt={[10]}>
              <Text color={"gray.500"} fontWeight={"bold"}>
                ABOUT
              </Text>
              <Text color={"gray.400"} textAlign={"justify"} mt={[2]}>
                {selectedJob?.description.about}
              </Text>

              <Text color={"gray.500"} fontWeight={"bold"} mt={[10]}>
                RESPONSIBILITIES
              </Text>
              <UnorderedList
                color={"gray.400"}
                textAlign={"justify"}
                colorScheme={"blue"}
                mt={[2]}
              >
                {selectedJob?.description.responsibilities.map(
                  (responsibility, index) => (
                    <ListItem key={index}>{responsibility}</ListItem>
                  )
                )}
              </UnorderedList>

              <Text color={"gray.500"} fontWeight={"bold"} mt={[10]}>
                SKILLS
              </Text>
              <Box display = "flex" mt={[2]}>
                {selectedJob?.description.skills.map((skill, index) => (
                  <Tag
                    key={index}
                    variant={"outline"}
                    colorScheme={"blue"}
                    mr={[2]}
                  >
                    {skill}
                  </Tag>
                ))}
              </Box>

              {/* Apply button */}

              <Box display="flex" mt={[12]}>
                <Button
                  w="100%"
                  variant={"ghost"}
                  colorScheme={"red"}
                  py={[8]}
                  mr={[2]}
                  isLoading={btnLoading}
                  leftIcon={<DeleteIcon />}
                  onClick={handleDeleteJob}
                >
                  Delete job
                </Button>

                <Button
                  w="100%"
                  colorScheme={"blue"}
                  variant={"solid"}
                  py={[8]}
                  boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.5)"}
                  onClick={() => {
                    navigate(`/admin/applications/job/${selectedJob?._id}`);
                  }}
                  rightIcon={<ChevronRightIcon />}
                >
                  View applications
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display = "flex"
            justifyContent={"center"}
            flexDirection={"column"}
            textAlign={"center"}
            mt={[10]}
          >
            <img src={eyes} width={"50px"} style={{ margin: "auto" }} />
            <Text color={"gray.400"} mt={[1]}>
              The job you are looking for does not exist
            </Text>
          </Box>
        )}
      </Skeleton>
    </Box>
  );
};

export default JobDescriptionAdmin;
