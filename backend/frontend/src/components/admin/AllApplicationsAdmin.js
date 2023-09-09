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
  Select,
  FormLabel,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { BsLightningChargeFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { getAllApplicationsAdmin } from "../../api/applications";
import { useJobs } from "../../contexts/jobsContext";
import { useProfile } from "../../contexts/profileContext";

import { ToastConfig } from "../ToastConfig";

import eyes from "../../assets/eyes.gif";

import ProfileDrawer from "./ProfileDrawer";

const AllApplicationsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const { selectedJob, setSelectedJob } = useJobs();
  const { profile, setProfile } = useProfile();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const fetchAllApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllApplicationsAdmin();
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
    fetchAllApplications();
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

  const handleViewApplicantProfileDrawer = (application) => {
    //
    setProfile(application?.profile);
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
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        // alignItems={"center"}
        flexDirection={["column"]}
      >
        <Heading color={"gray.600"} fontSize={["2xl", null, null, "3xl"]}>
          All applications
        </Heading>

        <Box w={["100%", null, null, "40%"]} mt={[6]}>
          <FormLabel color={"gray.500"}>Filter by status</FormLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="applied">Applied</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </Select>
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
            {applications
              .filter((application) => {
                if (statusFilter === "All") {
                  return true;
                } else {
                  return application.status === statusFilter;
                }
              })
              .map((application, index) => (
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
                        <Link to={`/admin/job/${application?.job?.id}`}>
                          {application?.job?.id}
                        </Link>
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
                                Your application does not have any feedback at
                                the moment.
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
            No applications have been received yet.
          </Text>
        )}
      </Skeleton>

      <ProfileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Box>
  );
};

export default AllApplicationsAdmin;
