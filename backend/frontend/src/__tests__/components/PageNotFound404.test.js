
// PageNotFound404.test.js
import React from 'react';
import { render, screen } from '../../utils/test-utils';
import PageNotFound404 from './PageNotFound404';

describe('PageNotFound404 Component', () => {
  test('renders 404 message', () => {
    render(<PageNotFound404 />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('applies correct styling', () => {
    render(<PageNotFound404 />);
    const container = screen.getByText('404').parentElement;
    expect(container).toHaveStyle({
      width: '100%',
      borderRadius: '8px'
    });
  });
});
