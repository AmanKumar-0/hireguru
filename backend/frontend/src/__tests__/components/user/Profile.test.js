
// Profile.test.js
import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import Profile from './user/Profile';
import { getMyProfile } from '../../../api/profile';
import { UtilProvider } from '../../../contexts/utilContext';


jest.mock('../../../api/profile');

describe('Profile Component', () => {
  const mockProfile = {
    user: { username: 'testuser' },
    name: { first: 'John', last: 'Doe' },
    contact: { email: 'john@example.com', phone: '1234567890' },
    education: {
      university: 'Test University',
      degree: 'Computer Science'
    },
    experience: [{
      company: 'Test Corp',
      role: 'Developer'
    }],
    skills: ['React', 'Node'],
    linkedinURL: 'https://linkedin.com/in/johndoe',
    attachments: []
  };

  beforeEach(() => {
    getMyProfile.mockResolvedValue({ data: mockProfile });
  });

  test('renders profile information', async () => {
    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  test('shows profile form when no profile exists', async () => {
    getMyProfile.mockResolvedValue({ data: null });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(/complete your profile now/i)).toBeInTheDocument();
    });
  });

  test('displays confetti on profile creation', async () => {
    const mockRunConfetti = jest.fn();
    render(
      <UtilProvider value={{ runConfetti: true, setRunConfetti: mockRunConfetti }}>
        <Profile />
      </UtilProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('confetti')).toBeInTheDocument();
    });
  });
});
