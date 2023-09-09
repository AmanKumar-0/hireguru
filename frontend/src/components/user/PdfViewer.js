import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewerComponent = ({ pdfData }) => {
  return (
      <Document file={{ data: pdfData }}>
        <Page pageNumber={1} />
      </Document>

  );
};

export default PdfViewerComponent;
