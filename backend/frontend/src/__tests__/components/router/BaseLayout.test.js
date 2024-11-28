// BaseLayout.test.js
import BaseLayout from './BaseLayout';
import { render, screen } from '../../utils/test-utils';
import { AuthContext } from '../../../contexts/authContext';

// Mock child components
jest.mock('../components/Nav', () => () => <div data-testid="nav">Nav</div>);
jest.mock('../components/Sidebar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('../components/RightPanel', () => () => <div data-testid="right-panel">RightPanel</div>);

describe('BaseLayout', () => {
  const renderWithAuth = (authValue) => {
    return render(
      <AuthContext.Provider value={authValue}>
        <BaseLayout />
      </AuthContext.Provider>
    );
  };

  it('should render layout components for all users', () => {
    renderWithAuth({ isAuthenticated: false, user: null });
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('right-panel')).toBeInTheDocument();
  });

  it('should render UserRouter for non-authenticated users', () => {
    renderWithAuth({ isAuthenticated: false, user: null });
    expect(screen.getByTestId('all-jobs')).toBeInTheDocument();
  });

  it('should render AdminRouter for admin users', () => {
    renderWithAuth({ isAuthenticated: true, user: { isAdmin: true } });
    expect(screen.getByTestId('all-jobs-admin')).toBeInTheDocument();
  });

  it('should render UserRouter for regular authenticated users', () => {
    renderWithAuth({ isAuthenticated: true, user: { isAdmin: false } });
    expect(screen.getByTestId('all-jobs')).toBeInTheDocument();
  });
});