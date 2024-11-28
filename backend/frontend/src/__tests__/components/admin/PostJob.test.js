// PostJob.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import PostJob from './admin/PostJob';
import { postJobAdmin } from '../../../api/jobs';

jest.mock('../../../api/jobs');

describe('PostJob', () => {
  test('validates required fields', async () => {
    render(<PostJob />);
    
    const submitButton = screen.getByText(/post job/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please fill all the fields/i)).toBeInTheDocument();
    });
  });

  test('handles successful job posting', async () => {
    postJobAdmin.mockResolvedValue({ 
      data: { _id: '1', role: 'Test Role' } 
    });

    render(<PostJob />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: 'Test Role' }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Engineering' }
    });
    // ... fill other required fields

    const submitButton = screen.getByText(/post job/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => expect(postJobAdmin).toHaveBeenCalled());
    expect(await screen.findByText(/job posted successfully/i)).toBeInTheDocument();
  });
});