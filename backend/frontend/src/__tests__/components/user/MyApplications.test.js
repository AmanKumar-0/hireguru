
// MyApplications.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import MyApplications from './user/MyApplications';
import { getMyApplications } from '../../../api/applications';

jest.mock('../../../api/applications');

describe('MyApplications Component', () => {
  const mockApplications = [
    {
      _id: '1',
      job: {
        role: 'Frontend Developer',
        location: 'Remote',
        id: 'job1'
      },
      status: 'applied',
      createdAt: '2024-01-01',
      message: 'Application under review'
    }
  ];

  beforeEach(() => {
    getMyApplications.mockResolvedValue({ data: mockApplications });
  });

  test('renders applications list', async () => {
    render(<MyApplications />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Remote')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('APPLIED')).toBeInTheDocument();
    });
  });

  test('displays correct status colors', async () => {
    render(<MyApplications />);

    await waitFor(() => {
      const statusTag = screen.getByText('APPLIED');
      expect(statusTag).toHaveStyle({ backgroundColor: 'blue.400' });
    });
  });

  test('shows feedback accordion', async () => {
    render(<MyApplications />);

    const accordionButton = await screen.findByText(/view recruiter's feedback/i);
    fireEvent.click(accordionButton);
    await waitFor(() => {
      expect(screen.getByText('Application under review')).toBeInTheDocument();
    });
  });
});
