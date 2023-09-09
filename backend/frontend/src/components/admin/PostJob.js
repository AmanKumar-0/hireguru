import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Input,
  Select,
  Textarea,
  useToast,
  Button,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";

import { ToastConfig } from "../ToastConfig";
import { useUtil } from "../../contexts/utilContext";

import { postJobAdmin } from "../../api/jobs";

const PostJob = () => {
  const [responsibilitiesInputField, setResponsibilitiesInputField] = useState([
    {
      title: "",
    },
  ]);

  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const toast = useToast();
  const { tabIndex, setTabIndex } = useUtil();
  const navigate = useNavigate();

  const handleAddFields = () => {
    if (responsibilitiesInputField.length < 5) {
      const values = [...responsibilitiesInputField];
      values.push({
        title: "",
      });
      setResponsibilitiesInputField(values);
    } else {
      toast(ToastConfig("Error", "Maximum 5 fields allowed", "error"));
    }
  };

  const handleRemoveFields = () => {
    if (responsibilitiesInputField.length > 1) {
      const values = [...responsibilitiesInputField];
      values.pop();
      setResponsibilitiesInputField(values);
    } else {
      toast(ToastConfig("Error", "At least one field is required", "error"));
    }
  };

  const handleResponsibilityInputChange = (index, event) => {
    const values = [...responsibilitiesInputField];
    values[index].title = event.target.value;
    setResponsibilitiesInputField(values);
  };

  const handlePostJob = async () => {
    // empty fields validation
    if (
      role === "" ||
      category === "" ||
      experience === "" ||
      location === "" ||
      salary === "" ||
      description === "" ||
      skills === ""
    ) {
      toast(ToastConfig("Error", "Please fill all the fields", "error"));
      return;
    }

    // responsibilities validation
    for (let i = 0; i < responsibilitiesInputField.length; i++) {
      if (responsibilitiesInputField[i].title === "") {
        toast(ToastConfig("Error", "All fields are required", "error"));
        return;
      }
    }

    const skillsArray = skills.split(",").map((skill) => skill.trim());

    const responsibilitiesArray = responsibilitiesInputField.map(
      (responsibility) => responsibility.title
    );

    const jobData = {
      role,
      tag: category,
      location,
      salary,
      duration: experience,
      description: {
        about: description,
        skills: skillsArray,
        responsibilities: responsibilitiesArray,
      },
    };

    // verify admin using admin tpin
    // const TPIN = window.prompt("Enter Admin TPIN to proceed 👽", "");
    // if (TPIN !== process.env.REACT_APP_ADMIN_TPIN) {
    //   toast(ToastConfig("Error", "Invalid TPIN", "error"));
    //   return;
    // }

    try {
      setBtnLoading(true);
      const data = await postJobAdmin(jobData);
      
      toast(ToastConfig("Success", "Job posted successfully", "success"));
      navigate(`/admin/job/${data.data._id}`);

      // reset state
      setRole("");
      setCategory("");
      setExperience("");
      setLocation("");
      setSalary("");
      setDescription("");
      setResponsibilitiesInputField([
        {
          title: "",
        },
      ]);
      setSkills("");
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setTabIndex(0);
  }, []);

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
        Post new job
      </Heading>
      <Box w={"100%"} mt={[6]}>
        <Text color={"blue.500"} fontWeight={"bold"}>
          GENERAL
        </Text>

        <Box
          display = "flex"
          justifyContent={"space-between"}
          w="100%"
          my={[4]}
          flexWrap={"wrap"}
        >
          <Box display = "flex" flexDirection={"column"} w="100%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Role
            </Text>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </Box>
        </Box>
      </Box>

      {/* Additional details */}
      <Box w={"100%"} mt={[10]}>
        <Text color={"blue.500"} fontWeight={"bold"}>
          ADDITIONAL DETAILS
        </Text>

        <Box
          display = "flex"
          justifyContent={"space-between"}
          w="100%"
          my={[4]}
          flexWrap={"wrap"}
        >
          <Box display = "flex" flexDirection={"column"} w="49%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Category
            </Text>
            <Select
              placeholder="Select option"
              color={"gray.500"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Legal">Legal</option>
              <option value="HR">HR</option>
              <option value="DevOps">DevOps</option>
              <option value="QA">QA</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Other">Other</option>
            </Select>
          </Box>

          <Box display = "flex" flexDirection={"column"} w="49%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Experience
            </Text>
            <Input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </Box>

          <Box display = "flex" flexDirection={"column"} w="49%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Location
            </Text>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>

          <Box display = "flex" flexDirection={"column"} w="49%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Salary
            </Text>
            <Input value={salary} onChange={(e) => setSalary(e.target.value)} />
          </Box>
        </Box>
      </Box>

      {/* Description */}
      <Box w={"100%"} mt={[10]}>
        <Text color={"blue.500"} fontWeight={"bold"}>
          DESCRIPTION
        </Text>

        <Box
          display = "flex"
          justifyContent={"space-between"}
          w="100%"
          my={[4]}
          flexWrap={"wrap"}
        >
          <Box display = "flex" flexDirection={"column"} w="100%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              About
            </Text>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Box display = "flex" flexDirection={"column"} w="100%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Responsibilities
            </Text>
            {
              // Loop and print the fields
              responsibilitiesInputField.map((inputField, index) => (
                <Input
                  mb={[2]}
                  value={inputField.title}
                  onChange={(e) => handleResponsibilityInputChange(index, e)}
                />
              ))
            }
          </Box>

          <Box display = "flex" mb={[4]}>
            <Button
              colorScheme={"blue"}
              variant={"ghost"}
              mr={[2]}
              onClick={handleAddFields}
            >
              <AddIcon />
            </Button>

            <Button
              colorScheme={"red"}
              variant={"ghost"}
              onClick={handleRemoveFields}
            >
              <DeleteIcon />
            </Button>
          </Box>

          <Box display = "flex" flexDirection={"column"} w="100%" mb={[4]}>
            <Text color={"gray.400"} mb={[1]}>
              Skills
            </Text>
            <Input
              placeholder="Enter comma seperated values"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      {/* Post button */}
      <Button
        w="100%"
        mt={[2]}
        variant={"solid"}
        colorScheme={"blue"}
        py={[10]}
        boxShadow={"0px 0px 40px rgba(66, 153, 225, 0.5)"}
        isLoading={btnLoading}
        onClick={handlePostJob}
      >
        Post job
      </Button>
    </Box>
  );
};

export default PostJob;
