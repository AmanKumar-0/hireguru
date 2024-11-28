// LogsAdmin.test.js
import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import LogsAdmin from './admin/LogsAdmin';
import { getLogsAdmin } from '../../../api/applications';

jest.mock('../../../api/applications');

describe('LogsAdmin', () => {
  const mockLogs = [
    {
      _id: '1',
      job: {
        role: 'Developer',
        location: 'Remote'
      },
      user: {
        username: 'testuser'
      },
      status: 'selected'
    }
  ];

  beforeEach(() => {
    getLogsAdmin.mockResolvedValue({ data: mockLogs });
  });

  test('renders logs table', async () => {
    render(<LogsAdmin />);
    
    await waitFor(() => {
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('SELECTED')).toBeInTheDocument();
    });
  });

  test('shows empty state when no logs', async () => {
    getLogsAdmin.mockResolvedValue({ data: [] });
    
    render(<LogsAdmin />);
    
    await waitFor(() => {
      expect(screen.getByText(/no activity found/i)).toBeInTheDocument();
    });
  });
});