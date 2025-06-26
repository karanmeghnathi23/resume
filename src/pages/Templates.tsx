import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import TemplateSelector from '@/components/resume/TemplateSelector';

const Templates: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Templates</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates to create your perfect resume.
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <TemplateSelector />
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-gray-600 mb-6">Ready to start building your resume?</p>
          <Button size="lg" asChild>
            <Link to="/builder">Start Building</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;