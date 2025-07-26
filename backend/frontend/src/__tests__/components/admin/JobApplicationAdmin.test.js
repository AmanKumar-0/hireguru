
// JobApplicationAdmin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import JobApplicationAdmin from './admin/JobApplicationAdmin';
import { getApplicationsForJobAdmin } from '../../../api/applications';

jest.mock('../../../api/applications');

describe('JobApplicationAdmin', () => {
  const mockApplications = [
    {
      _id: '1',
      status: 'applied',
      profile: {
        name: { first: 'John', last: 'Doe' },
        experience: [{ role: 'Developer', company: 'Tech Corp' }]
      },
      createdAt: '2024-01-01',
      message: 'Application feedback'
    }
  ];

  beforeEach(() => {
    getApplicationsForJobAdmin.mockResolvedValue({ data: mockApplications });
  });

  test('renders applications for specific job', async () => {
    render(<JobApplicationAdmin />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Developer @ Tech Corp')).toBeInTheDocument();
    });
  });

  test('handles profile drawer opening', async () => {
    render(<JobApplicationAdmin />);

    const quickViewButton = await screen.findByText('Quick profile view');
    fireEvent.click(quickViewButton);
    await waitFor(() => {
      expect(screen.getByText('Applicant profile')).toBeInTheDocument();
    });
  });

  test('shows empty state when no applications', async () => {
    getApplicationsForJobAdmin.mockResolvedValue({ data: [] });
    
    render(<JobApplicationAdmin />);

    await waitFor(() => {
      expect(screen.getByText(/This job has no applications yet/i)).toBeInTheDocument();
    });
  });
});
