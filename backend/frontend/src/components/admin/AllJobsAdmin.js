import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Tag,
  Button,
  useToast,
  Skeleton,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";

import { SearchIcon } from "@chakra-ui/icons";

import { getAllJobsAdmin } from "../../api/jobs";

import { ToastConfig } from "../ToastConfig";

import { useJobs } from "../../contexts/jobsContext";
import { useUtil } from "../../contexts/utilContext";

import eyes from "../../assets/eyes.gif";

const AllJobsAdmin = () => {
  const {
    jobs,
    setJobs,
    filteredJobs,
    setFilteredJobs,
    selectedJob,
    setSelectedJob,
  } = useJobs();
  const { tabIndex, setTabIndex } = useUtil();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const data = await getAllJobsAdmin();
      setJobs(data.data);
      setFilteredJobs(data.data);
      
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
    fetchAllJobs();
    setTabIndex(0);
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    

    const filteredResults = jobs.filter((job) => {
      return job.role.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredJobs(filteredResults);
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
        Active jobs
      </Heading>

      {/* Seacrh bar */}
      <Box my={[4, null, null, 6]}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" />}
            mt="4px"
            ml="4px"
          />
          <Input
            type="text"
            variant={"filled"}
            backgroundColor={"gray.50"}
            placeholder="Search roles"
            height={"48px"}
            onChange={(e) => handleSearch(e)}
          />
        </InputGroup>
      </Box>

      {/* Job list */}
      <Box display = "flex" justifyContent={"center"} flexDirection={"column"}>
        <Skeleton isLoaded={!loading}>
          {/* individual */}
          {filteredJobs.length > 0 ? (
            <>
              {filteredJobs.map((job) => (
                <Box
                  borderRadius={8}
                  border="2px"
                  borderColor="gray.100"
                  p={[4, null, null, 6]}
                  mb={[4]}
                >
                  <Box display = "flex" justifyContent={"space-between"}>
                    <Box
                      display = "flex"
                      justifyContent={"flex-start"}
                      flexDirection={"column"}
                    >
                      <Heading fontSize={["xl"]} color={"gray.600"}>
                        {job.role}
                      </Heading>
                      <Text color={"gray.400"} mt={[1]}>
                        {job.location}
                      </Text>
                    </Box>
                    <Box>
                      <Tag
                        color={"white"}
                        backgroundColor={"blue.400"}
                        opacity="0.6"
                      >
                        {job.tag}
                      </Tag>
                    </Box>
                  </Box>
                  {/* actions */}
                  <Box display = "flex">
                    <Button
                      variant={"solid"}
                      colorScheme={"blue"}
                      mt={[8]}
                      onClick={() => {
                        setSelectedJob(job);
                        navigate(`/admin/applications/job/${job._id}`);
                      }}
                    >
                      View applications
                    </Button>

                    <Button
                      variant={"outline"}
                      color={"blue.400"}
                      mt={[8]}
                      ml={[3]}
                      onClick={() => {
                        navigate(`/admin/job/${job._id}`);
                      }}
                    >
                      View & Manage job
                    </Button>
                  </Box>
                </Box>
              ))}
            </>
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
                No jobs found
              </Text>
            </Box>
          )}
        </Skeleton>
      </Box>
    </Box>
  );
};

export default AllJobsAdmin;
