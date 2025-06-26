import React from 'react';
import ResumeBuilder from '@/components/resume/ResumeBuilder';

const Builder: React.FC = () => {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Resume Builder</h1>
        <ResumeBuilder />
      </div>
    </div>
  );
};

export default Builder;