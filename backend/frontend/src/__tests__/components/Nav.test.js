// Nav.test.js
import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';
import { AuthContext } from '../contexts/authContext';
import { ProfileContext } from '../contexts/profileContext';

jest.mock('jwt-decode');

describe('Nav Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderNav = (authContextValue = {}, profileContextValue = {}) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <ProfileContext.Provider value={profileContextValue}>
            <Nav />
          </ProfileContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders HireGuru heading', () => {
    renderNav();
    expect(screen.getByText('HireGuru')).toBeInTheDocument();
  });

  test('shows login/register buttons when not authenticated', () => {
    renderNav({ isAuthenticated: false });
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('shows user menu when authenticated', () => {
    renderNav({
      isAuthenticated: true,
      user: { username: 'testuser' }
    });
    expect(screen.getByText('Hi testuser')).toBeInTheDocument();
  });

  test('handles logout correctly', async () => {
    const mockSetIsAuthenticated = jest.fn();
    const mockSetUser = jest.fn();
    const mockSetProfile = jest.fn();

    renderNav({
      isAuthenticated: true,
      user: { username: 'testuser' },
      setIsAuthenticated: mockSetIsAuthenticated,
      setUser: mockSetUser
    }, {
      setProfile: mockSetProfile
    });

    const menuButton = screen.getByText('Hi testuser');
    fireEvent.click(menuButton);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(mockSetProfile).toHaveBeenCalledWith(null);
    expect(localStorage.getItem('jwt-token')).toBeNull();
  });

  test('handles responsive menu items', () => {
    global.innerWidth = 767;
    global.dispatchEvent(new Event('resize'));

    renderNav({
      isAuthenticated: true,
      user: { isAdmin: true }
    });

    const menuButton = screen.getByText(/hi/i);
    fireEvent.click(menuButton);

    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('Applications')).toBeInTheDocument();
    expect(screen.getByText('Logs')).toBeInTheDocument();
  });
});
