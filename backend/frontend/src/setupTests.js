// src/setupTests.js
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';


jest.mock('./assets/eyes.gif', () => 'eyes.gif');
jest.mock('./assets/fire.gif', () => 'fire.gif');
jest.mock('./assets/party_face.gif', () => 'party_face.gif');
jest.mock('./assets/rocket.gif', () => 'rocket.gif');
jest.mock('./assets/unicorn.gif', () => 'unicorn.gif');

// Mock createRoot for React 18
jest.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: jest.fn(),
  }),
}));