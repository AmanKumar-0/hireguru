import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
  Alert,
  Link,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

import { useLocation, useNavigate } from "react-router-dom";

import { useJobs } from "../contexts/jobsContext";
import { useProfile } from "../contexts/profileContext";
import { useAuth } from "../contexts/authContext";

import { fetchQuotes } from "../api/quotes";
import unicorn from "../assets/unicorn.gif";
import { BsLinkedin } from "react-icons/bs";

const RightPanel = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();
  const { profile } = useProfile();
  const { isAuthenticated, user } = useAuth();

  const [fetchedFilters, setFetchedFilters] = useState({
    location: [],
    category: [],
  });

  const [filters, setFilters] = useState({
    location: "All locations",
    category: [],
  });

  const [quotes, setQuotes] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    const filteredJobsAsPerFilters = jobs.filter((job) => {
      if (filters.location !== "All locations") {
        if (job.location !== filters.location) {
          return false;
        }
      }

      if (filters.category.length > 0) {
        if (!filters.category.includes(job.tag)) {
          return false;
        }
      }

      return true;
    });

    setFilteredJobs(filteredJobsAsPerFilters);
    navigate("/");
  };

  const handleClearFilters = () => {
    setFilters({
      location: "All locations",
      category: [],
    });

    setFilteredJobs(jobs);
  };

  useEffect(() => {
    // get list of locations from jobs
    const locations = jobs.map((job) => job.location);
    const uniqueLocations = ["All locations", ...new Set(locations)];
    setFetchedFilters((prev) => ({ ...prev, location: uniqueLocations }));

    // get list of categories from jobs
    const categories = jobs.map((job) => job.tag);
    const uniqueCategories = [...new Set(categories)];
    setFetchedFilters((prev) => ({ ...prev, category: uniqueCategories }));
  }, [jobs]);

  const getQuotes = async () => {
    try {
      const data = await fetchQuotes();
      
      let tempQuotes = [];
      for (let i = 0; i < 3; i++) {
        tempQuotes.push(data[Math.floor(Math.random() * data.length)].text);
      }
      
      setQuotes(tempQuotes);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    // fetch quotes
    getQuotes();
  }, [location]);

  return (
    <Box
      w={[0, 0, "30%"]}
      h={["fit-content"]}
      display={["none", null, "block"]}
      px={[4, null, 6, 8]}
      // py={[4, null, 6, 8]}
      my={[12]}
      mr={[0, null, 6, 12]}
      // border="1px"
      // borderColor="gray.100"
      borderRadius={8}
      style={{
        position:"sticky",
        top:100,
        zIndex:100
      }}
    >
      {location.pathname === "/" || location.pathname.startsWith("/job/") ? (
        <>
          <Heading color={"gray.600"} fontSize={["lg", null, null, "3xl"]}>
            Filter jobs
          </Heading>

          {/* checkboxes */}
          <Box>
            <Text color={"gray.500"} fontWeight={"bold"} mt={[10]} mb={[2]}>
              Category
            </Text>
            <Box>
              <CheckboxGroup colorScheme="pink">
                {fetchedFilters.category.map((category, index) => (
                  <Checkbox
                    isChecked={filters.category.includes(category)}
                    onChange={(e) => {
                      const newFilters = { ...filters };
                      if (e.target.checked) {
                        newFilters.category.push(category);
                      } else {
                        newFilters.category = newFilters.category.filter(
                          (item) => item !== category
                        );
                      }
                      setFilters(newFilters);
                    }}
                    mr={[6]}
                    mt={[2]}
                    color={"gray.500"}
                  >
                    {category}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </Box>
          </Box>

          <Box>
            <Text color={"gray.500"} fontWeight={"bold"} mt={[10]} mb={[2]}>
              Location
            </Text>
            <Box>
              <Select
                placeholder="Select location"
                color={"gray.500"}
                onChange={(e) => {
                  const newFilters = { ...filters };
                  newFilters.location = e.target.value;
                  setFilters(newFilters);
                }}
                value={filters.location}
              >
                {fetchedFilters.location.map((location) => (
                  <option value={location}>{location}</option>
                ))}
              </Select>
            </Box>
          </Box>

          <Box mt={[6]} display = "flex" justifyContent={"flex-end"}>
            <Button
              variant={"ghost"}
              colorScheme={"pink"}
              px={[8]}
              py={[6]}
              mr={[2]}
              onClick={handleClearFilters}
              isDisabled={
                filters.category.length === 0 &&
                filters.location === "All locations"
              }
            >
              Clear
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"pink"}
              px={[8]}
              py={[6]}
              boxShadow={"0px 8px 40px rgba(237, 100, 166, 0.4)"}
              onClick={handleApplyFilters}
              isDisabled={
                filters.category.length === 0 &&
                filters.location === "All locations"
              }
            >
              Apply
            </Button>
          </Box>
        </>
      ) : user && user.isAdmin === false ? (
        <Box display = "flex" flexDirection={"column"} justifyContent={"center"}>
          {profile && profile.linkedinURL && (
            <Button
              py={[8]}
              mb={[8]}
              color={"#0072b1"}
              onClick={() => {
                window.open(profile.linkedinURL, "_blank");
              }}
              leftIcon={<BsLinkedin />}
            >
              My Linkedin Profile
            </Button>
          )}

          <Heading
            display = "flex"
            alignItems={"center"}
            color={"pink.500"}
            fontSize={["xl"]}
          >
            {" "}
            Go Slow{" "}
            <img
              src={unicorn}
              width={"40px"}
              style={{
                transform: " translate(4px, -4px)",
              }}
            />
          </Heading>

          {quotes.map((quote, index) => (
            <Alert
              status="info"
              mb="4"
              borderRadius="8"
              bgColor={`${index % 2 ? "blue.50" : "pink.50"}`}
              color={`${index % 2 ? "blue.600" : "pink.600"}`}
            >
              {quote}
            </Alert>
          ))}
        </Box>
      ) : user && user.isAdmin ? (
        <Box display = "flex" flexDirection={"column"} justifyContent={"center"}>
          <Button
            py={[8]}
            mb={[8]}
            colorScheme={"blue"}
            variant={"solid"}
            boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.4);"}
            onClick={() => {
              navigate("/admin/post-job");
            }}
            rightIcon={<ArrowRightIcon />}
          >
            Post new job
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default RightPanel;
