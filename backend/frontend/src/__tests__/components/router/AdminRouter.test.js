// AdminRouter.test.js
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import AdminRouter from './AdminRouter';
import { render, screen } from '../../utils/test-utils';

// Mock all admin components
jest.mock('../components/admin/AllJobsAdmin', () => () => <div data-testid="all-jobs-admin">AllJobsAdmin</div>);
jest.mock('../components/admin/JobDescriptionAdmin', () => () => <div data-testid="job-description-admin">JobDescriptionAdmin</div>);
jest.mock('../components/admin/AllApplicationsAdmin', () => () => <div data-testid="all-applications-admin">AllApplicationsAdmin</div>);
jest.mock('../components/admin/ApplicationAdmin', () => () => <div data-testid="application-admin">ApplicationAdmin</div>);
jest.mock('../components/admin/JobApplicationAdmin', () => () => <div data-testid="job-application-admin">JobApplicationAdmin</div>);
jest.mock('../components/admin/PostJob', () => () => <div data-testid="post-job">PostJob</div>);
jest.mock('../components/admin/LogsAdmin', () => () => <div data-testid="logs-admin">LogsAdmin</div>);
jest.mock('../components/PageNotFound404', () => () => <div data-testid="404">404</div>);

describe('AdminRouter', () => {
  const adminAuth = {
    isAuthenticated: true,
    user: { isAdmin: true }
  };

  const renderWithRoute = (route) => {
    return render(
      <AuthContext.Provider value={adminAuth}>
        <MemoryRouter initialEntries={[route]}>
          <AdminRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('should render AllJobsAdmin at /admin', () => {
    renderWithRoute('/admin');
    expect(screen.getByTestId('all-jobs-admin')).toBeInTheDocument();
  });

  it('should render JobDescriptionAdmin at /admin/job/:id', () => {
    renderWithRoute('/admin/job/123');
    expect(screen.getByTestId('job-description-admin')).toBeInTheDocument();
  });

  it('should render AllApplicationsAdmin at /admin/applications', () => {
    renderWithRoute('/admin/applications');
    expect(screen.getByTestId('all-applications-admin')).toBeInTheDocument();
  });

  it('should render PageNotFound404 for invalid routes', () => {
    renderWithRoute('/admin/invalid');
    expect(screen.getByTestId('404')).toBeInTheDocument();
  });
});
