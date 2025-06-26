import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FileText, Users, ThumbsUp, Award } from 'lucide-react';

const About: React.FC = () => {
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About ResumeBuilder</h1>
            <p className="text-xl text-gray-600">
              We're on a mission to help job seekers create professional resumes that stand out and
              get them noticed by employers.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                ResumeBuilder was founded with a simple goal: to make the job application process easier
                and more successful for everyone. We believe that everyone deserves a chance to showcase
                their skills and experience in the best possible light.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of career experts and designers have created a collection of professional resume
                templates that are both visually appealing and optimized for applicant tracking systems
                used by employers.
              </p>
              <p className="text-gray-600">
                Whether you're a recent graduate, changing careers, or a seasoned professional, our
                resume builder can help you create a resume that gets results.
              </p>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://placehold.co/600x400/2563eb/ffffff?text=Our+Story" 
                alt="Our Story" 
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at ResumeBuilder.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <FileText className="h-8 w-8 text-primary" />,
                title: 'Quality',
                description: 'We're committed to providing high-quality templates and tools that help you succeed.'
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: 'Accessibility',
                description: 'Our resume builder is designed to be easy to use for everyone, regardless of technical skill.'
              },
              {
                icon: <ThumbsUp className="h-8 w-8 text-primary" />,
                title: 'Helpfulness',
                description: 'We provide guidance and tips throughout the resume building process.'
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: 'Innovation',
                description: 'We continuously improve our platform based on industry trends and user feedback.'
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Your Resume?</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
              Join thousands of job seekers who have successfully created professional resumes with our builder.
            </p>
            <Button size="lg" asChild>
              <Link to="/builder">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;