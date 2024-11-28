
// ProfileForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import ProfileForm from './user/ProfileForm';
import { createMyProfile, uploadFile } from '../../../api/profile';

jest.mock('../../../api/profile');

describe('ProfileForm Component', () => {
  beforeEach(() => {
    uploadFile.mockResolvedValue({ fileName: 'test.pdf' });
    createMyProfile.mockResolvedValue({ 
      data: { message: 'Profile created successfully' } 
    });
  });

  test('validates required fields', async () => {
    render(<ProfileForm />);

    const submitButton = screen.getByText('Create my profile');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    render(<ProfileForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByText('Create my profile');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  test('handles file upload', async () => {
    render(<ProfileForm />);

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/drag and drop/i);

    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });

    fireEvent.drop(fileInput, {
      dataTransfer: {
        files: [file]
      }
    });

    expect(screen.getByText(/test.pdf/i)).toBeInTheDocument();
  });

  test('handles experience fields addition/removal', () => {
    render(<ProfileForm />);

    const addButton = screen.getByTestId('add-experience');
    const removeButton = screen.getByTestId('remove-experience');

    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText(/company/i)).toHaveLength(2);

    fireEvent.click(removeButton);
    expect(screen.getAllByPlaceholderText(/company/i)).toHaveLength(1);
  });


  test('submits form with all required fields', async () => {
    render(<ProfileForm />);

    // Fill personal information
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '1234567890' }
    });

    // Fill education details
    fireEvent.change(screen.getByLabelText(/university/i), {
      target: { value: 'Test University' }
    });
    fireEvent.change(screen.getByLabelText(/degree/i), {
      target:" { value: 'Computer Science' }\n    "});
    fireEvent.change(screen.getByLabelText(/majors/i), {
      target: { value: 'Software Engineering' }
    });
    fireEvent.change(screen.getByLabelText(/date of completion/i), {
      target: { value: '2024-01-01' }
    });

    // Fill experience details
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: 'Tech Corp' }
    });
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: 'Senior Developer' }
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2020-01-01' }
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2023-12-31' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Led development team' }
    });

    // Fill skills
    fireEvent.change(screen.getByPlaceholderText(/enter comma seperated values/i), {
      target: { value: 'React, Node.js, TypeScript' }
    });

    // Fill LinkedIn URL
    fireEvent.change(screen.getByLabelText(/linkedin profile url/i), {
      target: { value: 'https://www.linkedin.com/in/johndoe' }
    });

    // Upload resume
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/drag and drop/i);
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.drop(fileInput, {
      dataTransfer: { files: [file] }
    });

    // Submit form
    const submitButton = screen.getByText(/create my profile/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createMyProfile).toHaveBeenCalledWith(expect.objectContaining({
        name: { first: 'John', last: 'Doe' },
        contact: { 
          email: 'john.doe@example.com',
          phone: '1234567890'
        },
        education: {
          university: 'Test University',
          degree: 'Computer Science',
          field: 'Software Engineering',
          yearOfGraduation: '2024-01-01'
        },
        skills: ['React', 'Node.js', 'TypeScript'],
        linkedinURL: 'https://www.linkedin.com/in/johndoe'
      }));
    });
  });


});

// PdfViewer.