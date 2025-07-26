// AllJobsAdmin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import AllJobsAdmin from './admin/AllJobsAdmin';
import { getAllJobsAdmin } from '../../../api/jobs';

jest.mock('./../../api/jobs');

describe('AllJobsAdmin', () => {
  const mockJobs = [
    {
      _id: '1',
      role: 'Senior Engineer',
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
    getAllJobsAdmin.mockResolvedValue({ data: mockJobs });
  });

  test('renders job listings', async () => {
    render(<AllJobsAdmin />);

    await waitFor(() => {
      expect(screen.getByText('Active jobs')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });
  });

  test('handles search functionality', async () => {
    render(<AllJobsAdmin />);

    const searchInput = screen.getByPlaceholderText('Search roles');
    fireEvent.change(searchInput, { target: { value: 'engineer' } });

    await waitFor(() => {
      expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Product Manager')).not.toBeInTheDocument();
    });
  });

  test('shows empty state when no jobs found', async () => {
    getAllJobsAdmin.mockResolvedValue({ data: [] });
    
    render(<AllJobsAdmin />);

    await waitFor(() => {
      expect(screen.getByText('No jobs found')).toBeInTheDocument();
    });
  });

  test('navigates to job applications on button click', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }));

    render(<AllJobsAdmin />);

    await waitFor(() => {
      expect(screen.getAllByText('View applications')[0]).toBeInTheDocument();
    });

    const viewApplicationsButton = screen.getAllByText('View applications')[0];
    fireEvent.click(viewApplicationsButton);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
