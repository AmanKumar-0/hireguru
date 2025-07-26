// ProfileDrawer.test.js
import React from 'react';
import { render, screen } from '../../utils/test-utils';
import ProfileDrawer from "../../../components/admin/ProfileDrawer";


describe('ProfileDrawer', () => {
  const mockProfile = {
    name: {
      first: 'John',
      last: 'Doe'
    },
    contact: {
      email: 'john@example.com',
      phone: '1234567890'
    },
    education: {
      university: 'Test University',
      degree: 'Computer Science'
    },
    experience: [{
      company: 'Test Company',
      role: 'Developer'
    }],
    skills: ['React', 'Node'],
    linkedinURL: 'https://linkedin.com/in/johndoe',
    attachments: []
  };

  test('renders profile information', () => {
    render(
      <ProfileDrawer 
        isOpen={true} 
        onClose={() => {}} 
        profile={mockProfile}
      />
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('shows empty state when no profile', () => {
    render(
      <ProfileDrawer 
        isOpen={true} 
        onClose={() => {}} 
        profile={null}
      />
    );

    expect(screen.getByText(/profile you are looking for does not exist/i)).toBeInTheDocument();
  });
});