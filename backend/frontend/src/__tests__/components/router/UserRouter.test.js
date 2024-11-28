// UserRouter.test.js
import UserRouter from './UserRouter';
import { render, screen } from '../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';

// Mock all user components
jest.mock('../components/user/AllJobs', () => () => <div data-testid="all-jobs">AllJobs</div>);
jest.mock('../components/user/JobDescription', () => () => <div data-testid="job-description">JobDescription</div>);
jest.mock('../components/user/Profile', () => () => <div data-testid="profile">Profile</div>);
jest.mock('../components/user/MyApplications', () => () => <div data-testid="my-applications">MyApplications</div>);
jest.mock('../components/PageNotFound404', () => () => <div data-testid="404">404</div>);

describe('UserRouter', () => {
  const userAuth = {
    isAuthenticated: true,
    user: { isAdmin: false }
  };

  const renderWithRoute = (route) => {
    return render(
      <AuthContext.Provider value={userAuth}>
        <MemoryRouter initialEntries={[route]}>
          <UserRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('should render AllJobs at /', () => {
    renderWithRoute('/');
    expect(screen.getByTestId('all-jobs')).toBeInTheDocument();
  });

  it('should render JobDescription at /job/:id', () => {
    renderWithRoute('/job/123');
    expect(screen.getByTestId('job-description')).toBeInTheDocument();
  });

  it('should render Profile at /profile for authenticated users', () => {
    renderWithRoute('/profile');
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('should render PageNotFound404 for invalid routes', () => {
    renderWithRoute('/invalid');
    expect(screen.getByTestId('404')).toBeInTheDocument();
  });
});
