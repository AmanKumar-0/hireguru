// JobDescriptionAdmin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import JobDescriptionAdmin from './admin/JobDescriptionAdmin';
import { getSpecificJobAdmin, deleteJobAdmin } from '../../../api/jobs';

jest.mock('../../../api/jobs');

describe('JobDescriptionAdmin', () => {
  const mockJob = {
    _id: '1',
    role: 'Senior Developer',
    location: 'Remote',
    salary: '100k-150k',
    duration: '5+ years',
    tag: 'Engineering',
    description: {
      about: 'Test description',
      responsibilities: ['Resp 1', 'Resp 2'],
      skills: ['React', 'Node']
    }
  };

  beforeEach(() => {
    getSpecificJobAdmin.mockResolvedValue({ data: mockJob });
  });

  test('renders job details', async () => {
    render(<JobDescriptionAdmin />);
    
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

  test('handles job deletion', async () => {
    deleteJobAdmin.mockResolvedValue({ success: true });
    
    render(<JobDescriptionAdmin />);
    
    const deleteButton = await screen.findByText(/delete job/i);
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(deleteJobAdmin).toHaveBeenCalled();
    });
  });
});