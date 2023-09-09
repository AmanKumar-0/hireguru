import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Skeleton,
  useToast,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { getMyApplications } from "../../api/applications";
import { useJobs } from "../../contexts/jobsContext";

import { ToastConfig } from "../ToastConfig";

import eyes from "../../assets/eyes.gif";

const MyApplications = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const { selectedJob, setSelectedJob } = useJobs();

  const toast = useToast();

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const data = await getMyApplications();
      setApplications(data.data);
      
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
    fetchMyApplications();
    setSelectedJob(null);
    window.scrollTo(0, 0);
  }, []);

  const getTagColor = (status) => {
    if (status === "selected") {
      return "green.500";
    } else if (status === "rejected") {
      return "red.400";
    } else {
      return "blue.400";
    }
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
      <Heading color={"gray.600"} fontSize={["2xl", null, null, "3xl"]}>
        My applications
      </Heading>

      <Skeleton isLoaded={!loading}>
        {applications.length > 0 ? (
          <Box
            mt={[6]}
            display = "flex"
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {applications.map((application, index) => (
              <Box
                borderRadius={8}
                border="2px"
                borderColor="gray.100"
                px={[4, null, null, 6]}
                py={[6]}
                mb={[4]}
                display = "flex"
                flexDirection={"column"}
                key={index}
              >
                <Box display = "flex" justifyContent={"space-between"}>
                  <Box
                    display = "flex"
                    justifyContent={"flex-start"}
                    flexDirection={"column"}
                  >
                    <Heading fontSize={["xl"]} color={"gray.600"}>
                      {application?.job?.role}
                    </Heading>
                    <Text color={"gray.400"} mt={[1]}>
                      {application?.job?.location}
                    </Text>
                  </Box>
                  <Box>
                    <Tag
                      color={"white"}
                      backgroundColor={getTagColor(application?.status)}
                      size={"md"}
                      fontWeight={"bold"}
                    >
                      Status: {application?.status.toUpperCase()}
                    </Tag>
                  </Box>
                </Box>

                <Box display = "flex" justifyContent={"flex-start"} w="100%" mt={[6]}>
                  <Box display = "flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>APPLIED ON</Text>
                    <Text color={"gray.400"} fontWeight={"bold"}>
                      {new Date(application?.createdAt).toDateString()}
                    </Text>
                  </Box>

                  <Box display = "flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>JOB ID</Text>
                    <Text
                      color={"blue.400"}
                      fontWeight="normal"
                      _hover={{ textDecoration: "underline" }}
                    >
                      <Link to={`/job/${application?.job?.id}`}>
                        {application?.job?.id}
                      </Link>
                    </Text>
                  </Box>
                </Box>

                <Box mt={[10]}>
                  <Accordion allowToggle>
                    <AccordionItem
                      border={"none"}
                      backgroundColor={"gray.50"}
                      borderRadius={10}
                    >
                      <Text color={"gray.600"}>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            View <b>recruiter's feedback</b> on your application
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </Text>
                      <AccordionPanel pb={4}>
                        {application?.message === "" ? (
                          <Text color={"gray.500"}>
                            Your application does not have any feedback at the
                            moment.
                          </Text>
                        ) : (
                          <Text color={"gray.500"}>{application?.message}</Text>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Text color={"blue.500"} fontSize={["xl"]} mt={[10]}>
            <img src={eyes} />
            You have not applied to any jobs yet. What are you waiting for? :)
            Head to the "All Jobs" page to apply to your dream job!
          </Text>
        )}
      </Skeleton>
    </Box>
  );
};

export default MyApplications;
