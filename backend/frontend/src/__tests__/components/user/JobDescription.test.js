
// JobDescription.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import JobDescription from './user/JobDescription';
import { getSpecificJob } from '../../../api/jobs';
import { applyForJob, sendEmailToApplicantUser } from '../../../api/applications';
import { AuthContext } from '../../../contexts/authContext';

jest.mock('../../../api/jobs');
jest.mock('../../../api/applications');

describe('JobDescription Component', () => {
  const mockJob = {
    _id: '1',
    role: 'Senior Developer',
    location: 'Remote',
    salary: '100k-150k',
    duration: '5+ years',
    tag: 'Engineering',
    description: {
      about: 'Test description',
      responsibilities: ['Code review', 'System design'],
      skills: ['React', 'Node']
    }
  };

  beforeEach(() => {
    getSpecificJob.mockResolvedValue({ data: mockJob });
  });

  test('renders job details correctly', async () => {
    render(<JobDescription />);

    await waitFor(() => {
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Remote')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('100k-150k')).toBeInTheDocument();
    });
  });

  test('handles job application for unauthenticated user', async () => {
    render(<JobDescription />);

    const applyButton = await screen.findByText('Apply now');
    fireEvent.click(applyButton);
    await waitFor(() => {
      expect(screen.getByText('Please login to apply for this job')).toBeInTheDocument();
    });
  });

  test('handles successful job application', async () => {
    const mockAuthContext = {
      isAuthenticated: true,
      user: { id: '1' }
    };

    applyForJob.mockResolvedValue({ data: { _id: '1' } });
    sendEmailToApplicantUser.mockResolvedValue({ success: true });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <JobDescription />
      </AuthContext.Provider>
    );

    const applyButton = await screen.findByText('Apply now');
    fireEvent.click(applyButton);
    await waitFor(() => {
      expect(applyForJob).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(sendEmailToApplicantUser).toHaveBeenCalled();
    });
  });
});
