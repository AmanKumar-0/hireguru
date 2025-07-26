
// PdfViewer.test.js
import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import { Document } from 'react-pdf';
import PdfViewerComponent from './user/PdfViewer';

// Mock react-pdf
jest.mock('react-pdf', () => ({
  Document: jest.fn(),
  Page: jest.fn(),
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: ''
    }
  }
}));

describe('PdfViewer Component', () => {
  const mockPdfData = new Uint8Array([/* mock PDF data */]);

  beforeEach(() => {
    Document.mockImplementation(({ children }) => <div>{children}</div>);
  });

  test('renders PDF document', () => {
    render(<PdfViewerComponent pdfData={mockPdfData} />);
    expect(Document).toHaveBeenCalledWith(
      expect.objectContaining({
        file: { data: mockPdfData }
      }),
      expect.any(Object)
    );
  });

  test('handles PDF loading state', async () => {
    Document.mockImplementation(({ onLoadSuccess }) => {
      onLoadSuccess({ numPages: 1 });
      return <div>PDF loaded</div>;
    });

    render(<PdfViewerComponent pdfData={mockPdfData} />);
    await waitFor(() => {
      expect(screen.getByText('PDF loaded')).toBeInTheDocument();
    });
  });

  test('handles PDF loading error', async () => {
    Document.mockImplementation(({ onLoadError }) => {
      onLoadError(new Error('Failed to load PDF'));
      return <div>Error loading PDF</div>;
    });

    render(<PdfViewerComponent pdfData={mockPdfData} />);
    await waitFor(() => {
      expect(screen.getByText('Error loading PDF')).toBeInTheDocument();
    });
  });

  test('renders first page by default', () => {
    render(<PdfViewerComponent pdfData={mockPdfData} />);
    expect(screen.getByTestId('pdf-page')).toHaveAttribute('pageNumber', '1');
  });
});