import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeData } from '@/hooks/useResumeData';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ResumePreview from './ResumePreview';
import usePdfExport from '@/hooks/usePdfExport';
import { ArrowLeft, ArrowRight, Download, Eye, EyeOff } from 'lucide-react';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { resumeData, updateResumeData } = useResumeData();
  const { exportToPdf, isExporting } = usePdfExport();
  const [showPreview, setShowPreview] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleExportPdf = () => {
    exportToPdf('resume-preview', resumeData.personalInfo.name || 'resume');
  };

  const handleNext = () => {
    if (activeTab === 'personal') setActiveTab('experience');
    else if (activeTab === 'experience') setActiveTab('education');
    else if (activeTab === 'education') setActiveTab('skills');
  };

  const handlePrevious = () => {
    if (activeTab === 'skills') setActiveTab('education');
    else if (activeTab === 'education') setActiveTab('experience');
    else if (activeTab === 'experience') setActiveTab('personal');
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div 
          className={`w-full ${showPreview ? 'lg:w-1/2' : 'lg:w-2/3'}`}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Build Your Resume</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={togglePreview}
                >
                  {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleExportPdf}
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? 'Exporting...' : 'Export PDF'}
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} className="w-full">
              <TabsList className="w-full flex mb-6">
                <TabsTrigger 
                  className="flex-1" 
                  active={activeTab === 'personal'} 
                  onClick={() => handleTabChange('personal')}
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger 
                  className="flex-1" 
                  active={activeTab === 'experience'} 
                  onClick={() => handleTabChange('experience')}
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger 
                  className="flex-1" 
                  active={activeTab === 'education'} 
                  onClick={() => handleTabChange('education')}
                >
                  Education
                </TabsTrigger>
                <TabsTrigger 
                  className="flex-1" 
                  active={activeTab === 'skills'} 
                  onClick={() => handleTabChange('skills')}
                >
                  Skills
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="experience">
                <ExperienceForm />
              </TabsContent>
              
              <TabsContent value="education">
                <EducationForm />
              </TabsContent>
              
              <TabsContent value="skills">
                <SkillsForm />
              </TabsContent>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={activeTab === 'personal'}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={activeTab === 'skills'}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Tabs>
          </div>
        </motion.div>
        
        {showPreview && (
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>
              <div id="resume-preview" className="border rounded-md overflow-hidden">
                <ResumePreview />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;