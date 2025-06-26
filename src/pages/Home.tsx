import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FileText, Edit, Download, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: 'Professional Templates',
      description: 'Choose from multiple professionally designed resume templates.',
    },
    {
      icon: <Edit className="h-6 w-6 text-primary" />,
      title: 'Easy to Customize',
      description: 'Simple step-by-step process to create your perfect resume.',
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: 'Export to PDF',
      description: 'Download your resume as a PDF to share with employers.',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Create Your Professional Resume in Minutes
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-lg">
                Stand out with a professionally designed resume. Easy to create, customize, and download.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/builder">
                    Create Resume
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/templates">View Templates</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 md:mt-0 md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://placehold.co/600x400/2563eb/ffffff?text=Resume+Builder" 
                alt="Resume Builder" 
                className="w-full rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Resume Builder?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our easy-to-use resume builder helps you create a professional resume in minutes.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Professional Resume?</h2>
            <p className="text-primary-100 text-xl max-w-2xl mx-auto mb-8">
              Get started with our easy-to-use resume builder and land your dream job.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <Link to="/builder">
                Start Building Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;