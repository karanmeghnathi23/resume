import React from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FormItem, FormLabel, FormControl } from '@/components/ui/Form';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const { personalInfo = {} } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData({
      personalInfo: {
        ...personalInfo,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel htmlFor="name">Full Name</FormLabel>
          <FormControl>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={personalInfo.name || ''}
              onChange={handleChange}
            />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="title">Professional Title</FormLabel>
          <FormControl>
            <Input
              id="title"
              name="title"
              placeholder="Software Engineer"
              value={personalInfo.title || ''}
              onChange={handleChange}
            />
          </FormControl>
        </FormItem>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={personalInfo.email || ''}
              onChange={handleChange}
            />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <FormControl>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (123) 456-7890"
              value={personalInfo.phone || ''}
              onChange={handleChange}
            />
          </FormControl>
        </FormItem>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel htmlFor="location">Location</FormLabel>
          <FormControl>
            <Input
              id="location"
              name="location"
              placeholder="New York, NY"
              value={personalInfo.location || ''}
              onChange={handleChange}
            />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="website">Website/LinkedIn</FormLabel>
          <FormControl>
            <Input
              id="website"
              name="website"
              placeholder="linkedin.com/in/johndoe"
              value={personalInfo.website || ''}
              onChange={handleChange}
            />
          </FormControl>
        </FormItem>
      </div>
      
      <FormItem>
        <FormLabel htmlFor="summary">Professional Summary</FormLabel>
        <FormControl>
          <Textarea
            id="summary"
            name="summary"
            placeholder="A brief summary of your professional background and key strengths..."
            rows={4}
            value={personalInfo.summary || ''}
            onChange={handleChange}
          />
        </FormControl>
      </FormItem>
    </div>
  );
};

export default PersonalInfoForm;