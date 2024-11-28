// AuthModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import AuthModal from './AuthModal';
import { register, login } from '../../api/auth';
import { AuthContext } from '../contexts/authContext';
import { UtilContext } from '../contexts/utilContext';

jest.mock('../../api/auth');
jest.mock('jwt-decode', () => jest.fn());

describe('AuthModal Component', () => {
  const mockOnClose = jest.fn();
  const mockSetIsAuthenticated = jest.fn();
  const mockSetUser = jest.fn();
  const mockSetTabIndex = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderAuthModal = (type = 'register') => {
    return render(
      <AuthContext.Provider value={{
        setIsAuthenticated: mockSetIsAuthenticated,
        setUser: mockSetUser
      }}>
        <UtilContext.Provider value={{
          setTabIndex: mockSetTabIndex
        }}>
          <AuthModal
            isOpen={true}
            onClose={mockOnClose}
            type={type}
          />
        </UtilContext.Provider>
      </AuthContext.Provider>
    );
  };

  test('renders register form correctly', () => {
    renderAuthModal('register');
    expect(screen.getByText('Create an account to continue')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  test('renders login form correctly', () => {
    renderAuthModal('login');
    expect(screen.getByText('Welcome back, Log in to continue')).toBeInTheDocument();
  });

  test('handles registration success', async () => {
    register.mockResolvedValueOnce({ data: 'success' });
    renderAuthModal('register');

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Create an account'));

    await waitFor(() => expect(register).toHaveBeenCalledWith('testuser', 'password123'));
    expect(screen.getByText('Account created successfully')).toBeInTheDocument();
  });

  test('handles login success', async () => {
    login.mockResolvedValueOnce({ data: 'token' });
    renderAuthModal('login');

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(login).toHaveBeenCalledWith('testuser', 'password123'));
    await waitFor(() => expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true));
  });

  test('toggles password visibility', () => {
    renderAuthModal();
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByText('Show');

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('handles form switching', () => {
    renderAuthModal('register');
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Welcome back, Log in to continue')).toBeInTheDocument();
  });
});