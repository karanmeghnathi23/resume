import React from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResumeData();
  const { selectedTemplate = 'modern' } = resumeData;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div className="resume-preview">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;