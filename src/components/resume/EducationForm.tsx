import React, { useState } from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { FormItem, FormLabel, FormControl } from '@/components/ui/Form';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

const defaultEducation: Education = {
  id: '',
  institution: '',
  degree: '',
  fieldOfStudy: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
};

const EducationForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education>(defaultEducation);
  const [isEditing, setIsEditing] = useState(false);

  const educations = resumeData.education || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEducation({
      ...currentEducation,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCurrentEducation({
      ...currentEducation,
      current: checked,
      endDate: checked ? '' : currentEducation.endDate,
    });
  };

  const handleAddEducation = () => {
    setIsDialogOpen(true);
    setCurrentEducation({
      ...defaultEducation,
      id: Date.now().toString(),
    });
    setIsEditing(false);
  };

  const handleEditEducation = (education: Education) => {
    setIsDialogOpen(true);
    setCurrentEducation(education);
    setIsEditing(true);
  };

  const handleDeleteEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id);
    updateResumeData({ education: updatedEducations });
  };

  const handleSaveEducation = () => {
    if (isEditing) {
      const updatedEducations = educations.map((edu) =>
        edu.id === currentEducation.id ? currentEducation : edu
      );
      updateResumeData({ education: updatedEducations });
    } else {
      updateResumeData({
        education: [...educations, currentEducation],
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Education</h3>
        <Button onClick={handleAddEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-gray-500">No education added yet.</p>
          <Button onClick={handleAddEducation} variant="outline" className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((education) => (
            <Card key={education.id}>
              <CardHeader className="py-4 px-6 flex flex-row justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">{education.degree} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}</h4>
                  <p className="text-gray-600">{education.institution}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditEducation(education)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteEducation(education.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{education.location}</span>
                  <span>
                    {education.startDate} - {education.current ? 'Present' : education.endDate}
                  </span>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{education.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Education' : 'Add Education'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <FormItem>
              <FormLabel htmlFor="institution">Institution</FormLabel>
              <FormControl>
                <Input
                  id="institution"
                  name="institution"
                  value={currentEducation.institution}
                  onChange={handleInputChange}
                  placeholder="University or school name"
                />
              </FormControl>
            </FormItem>
            
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel htmlFor="degree">Degree</FormLabel>
                <FormControl>
                  <Input
                    id="degree"
                    name="degree"
                    value={currentEducation.degree}
                    onChange={handleInputChange}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel htmlFor="fieldOfStudy">Field of Study</FormLabel>
                <FormControl>
                  <Input
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    value={currentEducation.fieldOfStudy}
                    onChange={handleInputChange}
                    placeholder="Computer Science, etc."
                  />
                </FormControl>
              </FormItem>
            </div>
            
            <FormItem>
              <FormLabel htmlFor="location">Location</FormLabel>
              <FormControl>
                <Input
                  id="location"
                  name="location"
                  value={currentEducation.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </FormControl>
            </FormItem>
            
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel htmlFor="startDate">Start Date</FormLabel>
                <FormControl>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="month"
                    value={currentEducation.startDate}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </FormItem>
              
              <FormItem>
                <FormLabel htmlFor="endDate">End Date</FormLabel>
                <FormControl>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="month"
                    value={currentEducation.endDate}
                    onChange={handleInputChange}
                    disabled={currentEducation.current}
                  />
                </FormControl>
              </FormItem>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="current"
                name="current"
                type="checkbox"
                checked={currentEducation.current}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="current" className="text-sm font-medium text-gray-700">
                I'm currently studying here
              </label>
            </div>
            
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  name="description"
                  value={currentEducation.description}
                  onChange={handleInputChange}
                  placeholder="Additional information about your education"
                  rows={4}
                />
              </FormControl>
            </FormItem>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEducation}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationForm;