// AdminPrivateRoute.test.js
import React from 'react';
import { render, screen } from '../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { AdminPrivateRoute } from './AdminPrivateRoute';

describe('AdminPrivateRoute', () => {
  const setupTest = (authValue) => {
    const MockChild = () => <div data-testid="protected">Protected Admin Content</div>;
    
    return render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter>
          <AdminPrivateRoute>
            <MockChild />
          </AdminPrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('should render children for authenticated admin user', () => {
    setupTest({ isAuthenticated: true, user: { isAdmin: true } });
    expect(screen.getByTestId('protected')).toBeInTheDocument();
  });

  it('should redirect non-authenticated users', () => {
    setupTest({ isAuthenticated: false, user: null });
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
  });

  it('should redirect authenticated non-admin users', () => {
    setupTest({ isAuthenticated: true, user: { isAdmin: false } });
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
  });
});

