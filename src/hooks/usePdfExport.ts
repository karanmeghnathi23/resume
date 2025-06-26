import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface UsePdfExportReturn {
  exportToPdf: (elementId: string, filename?: string) => Promise<void>;
  isExporting: boolean;
}

const usePdfExport = (): UsePdfExportReturn => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (elementId: string, filename = 'resume') => {
    setIsExporting(true);
    
    try {
      const element = document.getElementById(elementId);
      
      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`);
      }
      
      // Scale factor for better quality
      const scaleFactor = 2;
      
      const canvas = await html2canvas(element, {
        scale: scaleFactor,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // A4 dimensions in pts (72 dpi)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPdf, isExporting };
};

export default usePdfExport;