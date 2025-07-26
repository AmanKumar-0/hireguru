// AllJobs.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import AllJobs from './user/AllJobs';
import { getAllJobs } from '../../../api/jobs';

jest.mock('../../../api/jobs');

describe('AllJobs Component', () => {
  const mockJobs = [
    {
      _id: '1',
      role: 'Frontend Developer',
      location: 'Remote',
      tag: 'Engineering'
    },
    {
      _id: '2',
      role: 'Product Manager',
      location: 'New York',
      tag: 'Product'
    }
  ];

  beforeEach(() => {
    getAllJobs.mockResolvedValue({ data: mockJobs });
  });

  test('renders jobs list correctly', async () => {
    render(<AllJobs />);

    await waitFor(() => {
      expect(screen.getByText('Current openings')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });
  });

  test('handles search functionality', async () => {
    render(<AllJobs />);

    const searchInput = await screen.findByPlaceholderText(/what kind of jobs/i);
    fireEvent.change(searchInput, { target: { value: 'frontend' } });

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Product Manager')).not.toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    render(<AllJobs />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    getAllJobs.mockRejectedValue({ 
      response: { data: { message: 'Error fetching jobs' } }
    });

    render(<AllJobs />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching jobs')).toBeInTheDocument();
    });
  });
});
