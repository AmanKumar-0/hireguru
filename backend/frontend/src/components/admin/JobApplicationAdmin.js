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
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { ChevronLeftIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { BsLightningChargeFill } from "react-icons/bs";
import { getApplicationsForJobAdmin } from "../../api/applications";
import { useJobs } from "../../contexts/jobsContext";
import { useUtil } from "../../contexts/utilContext";
import { useProfile } from "../../contexts/profileContext";
import { useNavigate } from "react-router-dom";

import { ToastConfig } from "../ToastConfig";

import eyes from "../../assets/eyes.gif";

import ProfileDrawer from "./ProfileDrawer";

const JobApplicationAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const { tabIndex, setTabIndex } = useUtil();
  const jobId = window.location.pathname.split("/")[4];

  const { selectedJob, setSelectedJob } = useJobs();
  const { profile, setProfile } = useProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const fetchSpecificJobApplications = async () => {
    try {
      setLoading(true);
      const data = await getApplicationsForJobAdmin(jobId);
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
    fetchSpecificJobApplications();
    setTabIndex(1);
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

  const handleViewApplicantProfileDrawer = (application) => {
    //
    setProfile(application.profile);
    onOpen();
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
      <ChakraLink
        as={Link}
        to="/admin/applications"
        color={"blue.400"}
        fontWeight={"bold"}
      >
        <ChevronLeftIcon /> Go back to all applications
      </ChakraLink>
      <Heading
        mt={[4]}
        color={"gray.600"}
        fontSize={["2xl", null, null, "3xl"]}
      >
        Applications for
      </Heading>
      <Box
        mt={[4]}
        w="100%"
        backgroundColor={"blue.400"}
        borderRadius={8}
        p={[8]}
        display = "flex"
        // justifyContent={"space-between"}
        flexDirection={["column"]}
        boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.5)"}
      >
        <Box display = "flex" justifyContent={"flex-start"} flexDirection={"column"}>
          <Heading fontSize={"2xl"} color={"white"} fontWeight={"bold"}>
            {selectedJob?.role}
          </Heading>
          <Text color={"blue.50"} mt={[1]} fontWeight={"bold"}>
            {selectedJob?.location}
          </Text>

          <Text color={"blue.200"} mt={[6]}>
            {" "}
            JOB ID
          </Text>
          <Text
            color={"white"}
            fontWeight="normal"
            _hover={{ textDecoration: "underline" }}
          >
            <Link to={`/admin/job/${selectedJob?._id}`}>
              {selectedJob?._id}
            </Link>
          </Text>
        </Box>
      </Box>

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
                      {application?.profile?.name.first +
                        " " +
                        application?.profile?.name.last}
                    </Heading>
                    <Text color={"gray.400"} mt={[1]}>
                      {application?.profile?.experience[0].role +
                        " @ " +
                        application?.profile?.experience[0].company}
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
                  {/* <Box display = "flex" flexDirection={"column"} w="50%" mr={[4]}>
                    <Text color={"gray.300"}>LINKEDIN</Text>
                    <Text
                      color={"blue.400"}
                      fontWeight="normal"
                      _hover={{ textDecoration: "underline" }}
                    >
                      <Link to={`/job/${application?.job?.id}`}>
                        {application?.profile?.linkedinURL}
                      </Link>
                    </Text>
                  </Box> */}
                  <Box display = "flex" flexDirection={"column"} w="50%">
                    <Text color={"gray.300"}>APPLIED ON</Text>
                    <Text color={"gray.400"} fontWeight={"bold"}>
                      {new Date(application?.createdAt).toDateString()}
                    </Text>
                  </Box>
                </Box>

                <Box display={"flex"}>
                  <Button
                    mt={[10]}
                    w="100%"
                    colorScheme={"blue"}
                    variant={"solid"}
                    py={[6]}
                    mr={[2]}
                    rightIcon={<ArrowForwardIcon />}
                    onClick={() =>
                      navigate(`/admin/applications/${application?._id}`)
                    }
                  >
                    View application
                  </Button>
                  <Button
                    mt={[10]}
                    w="100%"
                    colorScheme={"blue"}
                    variant={"ghost"}
                    py={[6]}
                    rightIcon={<BsLightningChargeFill />}
                    onClick={() =>
                      handleViewApplicantProfileDrawer(application)
                    }
                  >
                    Quick profile view
                  </Button>
                </Box>

                {application?.message ? (
                  <Box mt={[3]}>
                    <Accordion allowToggle>
                      <AccordionItem
                        border={"none"}
                        backgroundColor={"gray.50"}
                        borderRadius={10}
                      >
                        <Text color={"gray.600"}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              View feedback shared
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
                            <Text color={"gray.500"}>
                              {application?.message}
                            </Text>
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                ) : null}
              </Box>
            ))}
          </Box>
        ) : (
          <Text color={"blue.500"} fontSize={["xl"]} mt={[10]}>
            <img src={eyes} />
            This job has no applications yet.
          </Text>
        )}
        <ProfileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Skeleton>
    </Box>
  );
};

export default JobApplicationAdmin;
