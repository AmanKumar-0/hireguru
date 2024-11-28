// UserPrivateRoute.test.js
import { UserPrivateRoute } from './UserPrivateRoute';
import { render, screen } from '../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';

describe('UserPrivateRoute', () => {
  const setupTest = (authValue) => {
    const MockChild = () => <div data-testid="protected">Protected User Content</div>;
    
    return render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter>
          <UserPrivateRoute>
            <MockChild />
          </UserPrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('should render children for authenticated regular user', () => {
    setupTest({ isAuthenticated: true, user: { isAdmin: false } });
    expect(screen.getByTestId('protected')).toBeInTheDocument();
  });

  it('should redirect non-authenticated users', () => {
    setupTest({ isAuthenticated: false, user: null });
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
  });

  it('should redirect admin users', () => {
    setupTest({ isAuthenticated: true, user: { isAdmin: true } });
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
  });
});

