
// RightPanel.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import RightPanel from './RightPanel';
import { fetchQuotes } from '../../api/quotes';
import { JobsContext } from '../contexts/jobsContext';
import { AuthContext } from '../contexts/authContext';

jest.mock('../../api/quotes');

describe('RightPanel Component', () => {
  const mockJobs = [
    { _id: '1', location: 'Remote', tag: 'Engineering' },
    { _id: '2', location: 'Onsite', tag: 'Design' }
  ];

  const mockContextValue = {
    jobs: mockJobs,
    setJobs: jest.fn(),
    filteredJobs: mockJobs,
    setFilteredJobs: jest.fn()
  };

  beforeEach(() => {
    fetchQuotes.mockResolvedValue([{ text: 'Test quote' }]);
  });

  test('renders filter section on jobs page', () => {
    render(
      <BrowserRouter>
        <JobsContext.Provider value={mockContextValue}>
          <RightPanel />
        </JobsContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/filter jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/location/i)).toBeInTheDocument();
  });

  test('handles filter application', async () => {
    render(
      <BrowserRouter>
        <JobsContext.Provider value={mockContextValue}>
          <RightPanel />
        </JobsContext.Provider>
      </BrowserRouter>
    );

    const locationSelect = screen.getByText(/select location/i);
    fireEvent.change(locationSelect, { target: { value: 'Remote' } });

    const applyButton = screen.getByText(/apply/i);
    fireEvent.click(applyButton);

    expect(mockContextValue.setFilteredJobs).toHaveBeenCalled();
  });

  test('displays motivational quotes for users', async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { isAdmin: false } }}>
          <RightPanel />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test quote')).toBeInTheDocument();
    });
  });
});
