// AuthForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import AuthForm from './AuthForm';
import { register } from '../../api/auth';
import { useToast } from '@chakra-ui/react';

jest.mock('../../api/auth');
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn()
}));

describe('AuthForm Component', () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    useToast.mockReturnValue(mockToast);
    jest.clearAllMocks();
  });

  test('renders register form correctly', () => {
    render(<AuthForm type="register" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });

  test('handles password visibility toggle', () => {
    render(<AuthForm type="register" />);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const toggleButton = screen.getByText(/show/i);

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('handles successful registration', async () => {
    register.mockResolvedValueOnce({ data: 'success' });
    render(<AuthForm type="register" />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(register).toHaveBeenCalledWith('testuser', 'password123');
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Success',
      status: 'success'
    }));
  });

  test('handles registration error', async () => {
    const errorMessage = 'Registration failed';
    register.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });
    render(<AuthForm type="register" />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Error',
      status: 'error'
    }));
  });
});
