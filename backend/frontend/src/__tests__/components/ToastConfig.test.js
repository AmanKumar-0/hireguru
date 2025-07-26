// ToastConfig.test.js
import { ToastConfig } from './ToastConfig';

describe('ToastConfig', () => {
  test('returns correct toast configuration', () => {
    const config = ToastConfig('Test Title', 'Test Description', 'success');
    
    expect(config).toEqual({
      title: 'Test Title',
      description: 'Test Description',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  });

  test('handles different status types', () => {
    const statuses = ['success', 'error', 'warning', 'info'];
    
    statuses.forEach(status => {
      const config = ToastConfig('Title', 'Description', status);
      expect(config.status).toBe(status);
    });
  });
});