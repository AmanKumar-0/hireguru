// test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { JobsProvider } from '../../contexts/jobsContext';
import { ProfileProvider } from '../../contexts/profileContext';
import { UtilProvider } from '../../contexts/utilContext';
import { AuthProvider } from '../../contexts/authContext';

const AllTheProviders = ({ children }) => {
  return (
    <ChakraProvider>
      <BrowserRouter>
            <AuthProvider>
        <JobsProvider>
          <ProfileProvider>
            <UtilProvider>
              {children}
            </UtilProvider>
          </ProfileProvider>
          </JobsProvider>
          </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};


const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
  
export * from '@testing-library/react';
export { customRender as render };


