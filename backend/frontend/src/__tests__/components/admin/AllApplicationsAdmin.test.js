// // import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// // import { ChakraProvider } from "@chakra-ui/react";
// // import { BrowserRouter } from "react-router-dom";
// // import { getAllApplicationsAdmin } from "../../../api/applications";
// // import { useJobs } from "../../../contexts/jobsContext";
// // import { useProfile } from "../../../contexts/profileContext";
// // import AllApplicationsAdmin from "../../../components/admin/AllApplicationsAdmin";

// // // Mocking dependencies
// // jest.mock("../../../api/index", () => {
// //   return {
// //     getAuthorizationHeader: jest.fn(),
// //     axiosInstance: {
// //       get: jest.fn(),
// //       post: jest.fn(),
// //     },
// //   };
// // });
// // jest.mock("../../../api/applications", () => {
// //   return {
// //     applyForJob: jest.fn(),
// //     getMyApplications: jest.fn(),
// //     sendEmailToApplicantUser: jest.fn(),
// //     getAllApplicationsAdmin: jest.fn(),
// //     getApplicationsForJob: jest.fn(),
// //   };
// // });
// // jest.mock("../../../contexts/jobsContext");
// // jest.mock("../../../contexts/profileContext");

// // const mockNavigate = jest.fn();
// // jest.mock("react-router-dom", () => ({
// //   ...jest.requireActual("react-router-dom"),
// //   useNavigate: () => mockNavigate,
// // }));

// // const mockApplications = [
// //   {
// //     _id: "1",
// //     status: "applied",
// //     createdAt: "2023-12-01T12:00:00Z",
// //     message: "Good application",
// //     profile: { name: "John Doe" },
// //     job: { id: "101", role: "Frontend Developer", location: "Remote" },
// //   },
// //   {
// //     _id: "2",
// //     status: "selected",
// //     createdAt: "2023-12-02T12:00:00Z",
// //     message: "",
// //     profile: { name: "Jane Doe" },
// //     job: { id: "102", role: "Backend Developer", location: "Onsite" },
// //   },
// // ];

// // describe("AllApplicationsAdmin Component", () => {
// //   beforeEach(() => {


// //     useJobs.mockReturnValue({
// //       selectedJob: null,
// //       setSelectedJob: jest.fn(),
// //     });
// //     useProfile.mockReturnValue({
// //       profile: null,
// //       setProfile: jest.fn(),
// //     });
// //   });

// //   it("renders the component and fetches applications", async () => {
// //     getAllApplicationsAdmin.mockImplementation(() => {
// //       return Promise.resolve({ data: mockApplications });
// //     }
// //     );
// //     render(
// //       <ChakraProvider>
// //         <BrowserRouter>
// //           <AllApplicationsAdmin />
// //         </BrowserRouter>
// //       </ChakraProvider>
// //     );

// //     // Initially show loading
// //     expect(screen.getByText(/all applications/i)).toBeInTheDocument();
// //     expect(screen.getByText(/loading/i)).toBeInTheDocument();

// //     // Wait for data to load
// //     expect(await screen.findByText(/Frontend Developer/i)).toBeInTheDocument();
// //     expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
// //   });

// //   it("filters applications by status", async () => {
// //     getAllApplicationsAdmin.mockResolvedValue({ data: mockApplications });

// //     render(
// //       <ChakraProvider>
// //         <BrowserRouter>
// //           <AllApplicationsAdmin />
// //         </BrowserRouter>
// //       </ChakraProvider>
// //     );

// //     expect(await screen.findByText(/Frontend Developer/i)).toBeInTheDocument();

// //     // Select "Selected" from the filter dropdown
// //     fireEvent.change(screen.getByLabelText(/filter by status/i), {
// //       target: { value: "selected" },
// //     });

// //     await waitFor(() =>
// //       expect(screen.queryByText(/Frontend Developer/i)).not.toBeInTheDocument()
// //     );
// //     expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
// //   });

// //   it("renders the correct tag color for application status", async () => {
// //     getAllApplicationsAdmin.mockResolvedValue({ data: mockApplications });

// //     render(
// //       <ChakraProvider>
// //         <BrowserRouter>
// //           <AllApplicationsAdmin />
// //         </BrowserRouter>
// //       </ChakraProvider>
// //     );

// //     expect(await screen.findByText(/Frontend Developer/i)).toBeInTheDocument();

// //     // Check tag colors
// //     const appliedTag = screen.getByText(/status: applied/i);
// //     const selectedTag = screen.getByText(/status: selected/i);

// //     expect(appliedTag).toHaveStyle("background-color: blue.400");
// //     expect(selectedTag).toHaveStyle("background-color: green.500");
// //   });

// //   it("handles Quick profile view button click", async () => {
// //     const setProfileMock = jest.fn();
// //     useProfile.mockReturnValue({
// //       profile: null,
// //       setProfile: setProfileMock,
// //     });

// //     getAllApplicationsAdmin.mockResolvedValue({ data: mockApplications });

// //     render(
// //       <ChakraProvider>
// //         <BrowserRouter>
// //           <AllApplicationsAdmin />
// //         </BrowserRouter>
// //       </ChakraProvider>
// //     );

// //     expect(await screen.findByText(/Frontend Developer/i)).toBeInTheDocument();

// //     const quickViewButton = screen.getByText(/quick profile view/i);
// //     fireEvent.click(quickViewButton);

// //     expect(setProfileMock).toHaveBeenCalledWith(mockApplications[0].profile);
// //   });

// //   it("navigates to View application page on button click", async () => {
// //     getAllApplicationsAdmin.mockResolvedValue({ data: mockApplications });

// //     render(
// //       <ChakraProvider>
// //         <BrowserRouter>
// //           <AllApplicationsAdmin />
// //         </BrowserRouter>
// //       </ChakraProvider>
// //     );

// //     expect(await screen.findByText(/Frontend Developer/i)).toBeInTheDocument();

// //     const viewApplicationButton = screen.getByText(/view application/i);
// //     fireEvent.click(viewApplicationButton);

// //     expect(mockNavigate).toHaveBeenCalledWith("/admin/applications/1");
// //   });

// //   it("displays a message when no applications are available", async () => {
// //     getAllApplicationsAdmin.mockResolvedValue({ data: [] });

// //     render(
// //       <ChakraProvider>
// //         <BrowserRouter>
// //           <AllApplicationsAdmin />
// //         </BrowserRouter>
// //       </ChakraProvider>
// //     );

// //     expect(
// //       await screen.findByText(/no applications have been received yet/i)
// //     ).toBeInTheDocument();
// //   });
// // });

// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { ChakraProvider } from "@chakra-ui/react";
// import { BrowserRouter } from "react-router-dom";
// import { getAllApplicationsAdmin } from "../../../api/applications";
// import { useJobs } from "../../../contexts/jobsContext";
// import { useProfile } from "../../../contexts/profileContext";
// import AllApplicationsAdmin from "../../../components/admin/AllApplicationsAdmin";

// // TypeError: root.unmount is not a function
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => jest.fn(),
// }));

// // Mocking dependencies
// // In your test file
// jest.mock("../../../api/applications", () => ({
//   getAllApplicationsAdmin: jest.fn().mockImplementation(() => {
//     console.log('Mock getAllApplicationsAdmin called');
    
//     // Different mock scenarios
//     const scenarios = {
//       default: {
//         data: [
//   {
//     _id: "1",
//     status: "applied",
//     createdAt: "2023-12-01T12:00:00Z",
//     message: "Good application",
//     profile: { name: "John Doe" },
//     job: { id: "101", role: "Frontend Developer", location: "Remote" },
//   },
//   {
//     _id: "2",
//     status: "selected",
//     createdAt: "2023-12-02T12:00:00Z",
//     message: "",
//     profile: { name: "Jane Doe" },
//     job: { id: "102", role: "Backend Developer", location: "Onsite" },
//   },
// ]
//       },
//       empty: {
//         data: []
//       },
//       error: {
//         error: new Error('API Error')
//       }
//     };

//     // You can modify this to test different scenarios
//     const currentScenario = scenarios.default;

//     console.log('Mock Scenario:', currentScenario);

//     if (currentScenario.error) {
//       console.error('Mock API Error:', currentScenario.error);
//       return Promise.reject(currentScenario.error);
//     }

//     return Promise.resolve(currentScenario);
//   })
// }));


// jest.mock("../../../contexts/jobsContext", () => ({
//   useJobs: jest.fn(),
// }));

// jest.mock("../../../contexts/profileContext", () => ({
//   useProfile: jest.fn(),
// }));

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => jest.fn(),
// }));

// // Mock the assets
// jest.mock("../../../assets/eyes.gif", () => "mock-eyes-gif");

// // const mockApplications = [
// //   {
// //     _id: "1",
// //     status: "applied",
// //     createdAt: "2023-12-01T12:00:00Z",
// //     message: "Good application",
// //     profile: { name: "John Doe" },
// //     job: { id: "101", role: "Frontend Developer", location: "Remote" },
// //   },
// //   {
// //     _id: "2",
// //     status: "selected",
// //     createdAt: "2023-12-02T12:00:00Z",
// //     message: "",
// //     profile: { name: "Jane Doe" },
// //     job: { id: "102", role: "Backend Developer", location: "Onsite" },
// //   },
// // ];

// describe("AllApplicationsAdmin Component", () => {
//   const mockSetSelectedJob = jest.fn();
//   const mockSetProfile = jest.fn();

//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks();

//     // Setup default mock implementations
//     useJobs.mockReturnValue({
//       selectedJob: null,
//       setSelectedJob: mockSetSelectedJob,
//     });

//     useProfile.mockReturnValue({
//       profile: null,
//       setProfile: mockSetProfile,
//     });

//     // Mock window.scrollTo to prevent errors
//     window.scrollTo = jest.fn();
//   });

//   const renderComponent = async () => {
//     // getAllApplicationsAdmin.mockResolvedValue({ data: applications });

//     const view = render(
//       <ChakraProvider>
//         <BrowserRouter>
//           <AllApplicationsAdmin />
//         </BrowserRouter>
//       </ChakraProvider>
//     );

//     // Wait for loading to complete
//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
//     });

//     return view;
//   };

//   test("renders the component and fetches applications", async () => {
//     await renderComponent();

//     // screen.debug();
//     // Check if applications are rendered
//     expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
//     await waitFor(() => {
//       expect(screen.queryByText(/Frontend Developer/i)).not.toBeInTheDocument();
//     });

//     await waitFor(() => {
//       expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
//     });
//   });

//   // test("filters applications by status", async () => {
//   //   await renderComponent();

//   //   // Select "Selected" from the filter dropdown
//   //   const statusFilter = screen.getByLabelText(/filter by status/i);
//   //   fireEvent.change(statusFilter, { target: { value: "selected" } });

//   //   // Check filtered results
//   //   await waitFor(() => {
//   //     expect(screen.queryByText(/Frontend Developer/i)).not.toBeInTheDocument();
//   //     // expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
//   //   });
//   // });

//   // // test("displays message when no applications are available", async () => {
//   // //   await renderComponent([]);

//   // //   // Check for no applications message
//   // //   expect(screen.getByText(/no applications have been received yet/i)).toBeInTheDocument();
//   // // });

//   // // test("handles Quick profile view button click", async () => {
//   // //   await renderComponent();

//   // //   // Find and click Quick profile view button
//   // //   const quickViewButtons = screen.getAllByText(/quick profile view/i);
//   // //   fireEvent.click(quickViewButtons[0]);

//   // //   // Check if setProfile was called with correct profile
//   // //   expect(mockSetProfile).toHaveBeenCalledWith(mockApplications[0].profile);
//   // // });

//   // // test("renders correct status tag colors", async () => {
//   // //   await renderComponent();

//   // //   // Check tag colors
//   // //   const appliedTag = screen.getByText(/status: applied/i);
//   // //   const selectedTag = screen.getByText(/status: selected/i);

//   // //   // These assertions depend on the getTagColor function in the component
//   // //   expect(appliedTag).toHaveStyle({ backgroundColor: 'blue.400' });
//   // //   expect(selectedTag).toHaveStyle({ backgroundColor: 'green.500' });
//   // // });

//   // // test("handles job application details display", async () => {
//   // //   await renderComponent();

//   // //   // Check job details
//   // //   expect(screen.getByText(/Remote/i)).toBeInTheDocument();
//   // //   expect(screen.getByText(/Onsite/i)).toBeInTheDocument();

//   // //   // Check applied date
//   // //   const appliedDate = new Date(mockApplications[0].createdAt).toDateString();
//   // //   expect(screen.getByText(appliedDate)).toBeInTheDocument();
//   // // });

//   // test("expands and shows application message when available", async () => {
//   //   await renderComponent();

//   //   // Find and click the accordion button for the application with a message
//   //   const accordionButtons = screen.getAllByText(/view feedback shared/i);
//   //   fireEvent.click(accordionButtons[0]);

//   //   // Check if the message is displayed
//   //   expect(screen.getByText(/Good application/i)).toBeInTheDocument();
//   // });
// });



import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { getAllApplicationsAdmin } from "../../../api/applications";
import { useJobs } from "../../../contexts/jobsContext";
import { useProfile } from "../../../contexts/profileContext";
import AllApplicationsAdmin from "../../../components/admin/AllApplicationsAdmin";

jest.mock("../../../contexts/jobsContext", () => ({
  useJobs: jest.fn(),
}));
jest.mock("../../../contexts/profileContext", () => ({
  useProfile: jest.fn(),
}));

jest.getAllApplicationsAdmin = jest.fn();

describe("AllApplicationsAdmin", () => {
  const mockSetSelectedJob = jest.fn();
  const mockSetProfile = jest.fn();

  beforeEach(() => {
    useJobs.mockReturnValue({ setSelectedJob: mockSetSelectedJob });
    useProfile.mockReturnValue({ setProfile: mockSetProfile });
  });

  it("renders loading state initially", async () => {
    getAllApplicationsAdmin.mockResolvedValue([]);
    render(
      <ChakraProvider>
        <MemoryRouter>
          <AllApplicationsAdmin />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Loading applications...")).toBeInTheDocument();
    await waitFor(() => expect(getAllApplicationsAdmin).toHaveBeenCalled());
  });

  it("renders applications after API call", async () => {
    const mockApplications = [
      {
        id: "1",
        status: "Pending",
        jobTitle: "Frontend Developer",
        applicant: { name: "John Doe" },
      },
      {
        id: "2",
        status: "Approved",
        jobTitle: "Backend Developer",
        applicant: { name: "Jane Smith" },
      },
    ];
    getAllApplicationsAdmin.mockResolvedValue(mockApplications);

    render(
      <ChakraProvider>
        <MemoryRouter>
          <AllApplicationsAdmin />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(await screen.findByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer")).toBeInTheDocument();
  });

  it("filters applications by status", async () => {
    const mockApplications = [
      {
        id: "1",
        status: "Pending",
        jobTitle: "Frontend Developer",
        applicant: { name: "John Doe" },
      },
      {
        id: "2",
        status: "Approved",
        jobTitle: "Backend Developer",
        applicant: { name: "Jane Smith" },
      },
    ];
    getAllApplicationsAdmin.mockResolvedValue(mockApplications);

    render(
      <ChakraProvider>
        <MemoryRouter>
          <AllApplicationsAdmin />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
      // expect(screen.getByText("Backend Developer")).toBeInTheDocument();
    });

    const select = screen.getByLabelText("Filter by status:");
    fireEvent.change(select, { target: { value: "Pending" } });

    expect(screen.queryByText("Backend Developer")).not.toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("navigates to job details on button click", async () => {
    const mockApplications = [
      {
        id: "1",
        status: "Pending",
        jobTitle: "Frontend Developer",
        applicant: { name: "John Doe" },
      },
    ];
    getAllApplicationsAdmin.mockResolvedValue(mockApplications);

    render(
      <ChakraProvider>
        <MemoryRouter>
          <AllApplicationsAdmin />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(await screen.findByText("Frontend Developer")).toBeInTheDocument();

    const button = screen.getByText("View Job");
    fireEvent.click(button);

    expect(mockSetSelectedJob).toHaveBeenCalledWith("Frontend Developer");
  });
});
