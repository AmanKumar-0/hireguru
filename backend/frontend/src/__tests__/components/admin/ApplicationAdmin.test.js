
// ApplicationAdmin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import ApplicationAdmin from './admin/ApplicationAdmin';
import { 
  getSingleApplicationAdmin, 
  selectOrRejectApplicationAdmin,
  sendEmailToApplicantAdmin 
} from '../../../api/applications';

jest.mock('../../../api/applications');

describe('ApplicationAdmin', () => {
  const mockApplication = {
    _id: '1',
    status: 'applied',
    job: {
      role: 'Software Engineer',
      location: 'Remote',
      id: 'job1'
    },
    profile: {
      name: { first: 'John', last: 'Doe' },
      contact: { email: 'john@example.com', phone: '1234567890' },
      education: { university: 'Test University' },
      experience: [{ company: 'Test Corp', role: 'Developer' }],
      skills: ['React', 'Node']
    }
  };

  beforeEach(() => {
    getSingleApplicationAdmin.mockResolvedValue({ data: mockApplication });
  });

  test('renders application details', async () => {
    render(<ApplicationAdmin />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
  });

  test('handles candidate selection', async () => {
    selectOrRejectApplicationAdmin.mockResolvedValue({ success: true });
    sendEmailToApplicantAdmin.mockResolvedValue({ success: true });

    render(<ApplicationAdmin />);

    const feedbackInput = await screen.findByPlaceholderText(/provide some feedback/i);
    fireEvent.change(feedbackInput, { target: { value: 'Great candidate!' } });

    const selectButton = await screen.findByText('Select candidate');
    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(selectOrRejectApplicationAdmin).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(sendEmailToApplicantAdmin).toHaveBeenCalled();
    });
  });

  test('validates feedback before selection/rejection', async () => {
    render(<ApplicationAdmin />);

    const selectButton = await screen.findByText('Select candidate');
    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(screen.getByText('Please provide feedback')).toBeInTheDocument();
    });
  });
});
