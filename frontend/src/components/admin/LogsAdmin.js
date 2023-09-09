import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  useToast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Skeleton,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { getLogsAdmin } from "../../api/applications";
import { ToastConfig } from "../ToastConfig";
import { useUtil } from "../../contexts/utilContext";

import eyes from "../../assets/eyes.gif";

const LogsAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { tabIndex, setTabIndex } = useUtil();
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await getLogsAdmin();
      setLogs(data.data);
      
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
    fetchLogs();
    window.scrollTo(0, 0);
    setTabIndex(2);
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
    <>
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
          Admin activity logs
        </Heading>
        <Text color={"blue.500"} fontSize={["xl"]} mt={[1]}>
          Selected and rejected applications are listed here
        </Text>

        <Skeleton isLoaded={!loading}>
          {logs.length > 0 ? (
            <TableContainer mt={[10]}>
              <Table size="md" variant={"striped"}>
                <Thead>
                  <Tr>
                    <Th>Role</Th>
                    <Th>Location</Th>
                    <Th>Applicant username</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {logs.map((application, index) => (
                    <Tr
                      key={application._id}
                      _hover={{
                        opacity: 0.6,
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onClick={() =>
                        navigate(`/admin/applications/${application._id}`)
                      }
                    >
                      <Td>{application?.job?.role}</Td>
                      <Td>{application?.job?.location}</Td>
                      <Td>{application?.user?.username}</Td>
                      <Td>
                        <Tag
                          color={"white"}
                          backgroundColor={getTagColor(application?.status)}
                          size={"sm"}
                          textTransform={"uppercase"}
                        >
                          {application?.status}
                        </Tag>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Role</Th>
                    <Th>Location</Th>
                    <Th>Applicant username</Th>
                    <Th>Status</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          ) : (
            <Text color={"blue.500"} fontSize={["xl"]} mt={[10]}>
              <img src={eyes} />
              No activity found
            </Text>
          )}
        </Skeleton>
      </Box>
    </>
  );
};

export default LogsAdmin;
