
// Sidebar.test.js
import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/authContext';
import { UtilContext } from '../contexts/utilContext';

describe('Sidebar Component', () => {
  const mockSetTabIndex = jest.fn();

  const renderSidebar = (isAuthenticated = false, isAdmin = false) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated, user: { isAdmin } }}>
          <UtilContext.Provider value={{ tabIndex: 0, setTabIndex: mockSetTabIndex }}>
            <Sidebar />
          </UtilContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders user navigation when authenticated as user', () => {
    renderSidebar(true, false);
    expect(screen.getByText(/all jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/my applications/i)).toBeInTheDocument();
    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
  });

  test('renders admin navigation when authenticated as admin', () => {
    renderSidebar(true, true);
    expect(screen.getByText(/jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/applications/i)).toBeInTheDocument();
    expect(screen.getByText(/logs/i)).toBeInTheDocument();
  });

  test('handles tab selection', () => {
    renderSidebar(true, false);
    const profileTab = screen.getByText(/my profile/i);
    fireEvent.click(profileTab);
    expect(mockSetTabIndex).toHaveBeenCalledWith(2);
  });

  test('applies active styles to selected tab', () => {
    renderSidebar(true, false);
    const activeTab = screen.getByText(/all jobs/i).closest('button');
    expect(activeTab).toHaveStyle({
      backgroundColor: 'pink.400',
      color: 'white'
    });
  });

  test('renders nothing when not authenticated', () => {
    renderSidebar(false, false);
    expect(screen.queryByText(/all jobs/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/applications/i)).not.toBeInTheDocument();
  });
});