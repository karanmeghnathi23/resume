import React, { useState } from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { FormItem, FormLabel, FormControl } from '@/components/ui/Form';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

const defaultExperience: Experience = {
  id: '',
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
};

const ExperienceForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience>(defaultExperience);
  const [isEditing, setIsEditing] = useState(false);

  const experiences = resumeData.experiences || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCurrentExperience({
      ...currentExperience,
      current: checked,
      endDate: checked ? '' : currentExperience.endDate,
    });
  };

  const handleAddExperience = () => {
    setIsDialogOpen(true);
    setCurrentExperience({
      ...defaultExperience,
      id: Date.now().toString(),
    });
    setIsEditing(false);
  };

  const handleEditExperience = (experience: Experience) => {
    setIsDialogOpen(true);
    setCurrentExperience(experience);
    setIsEditing(true);
  };

  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    updateResumeData({ experiences: updatedExperiences });
  };

  const handleSaveExperience = () => {
    if (isEditing) {
      const updatedExperiences = experiences.map((exp) =>
        exp.id === currentExperience.id ? currentExperience : exp
      );
      updateResumeData({ experiences: updatedExperiences });
    } else {
      updateResumeData({
        experiences: [...experiences, currentExperience],
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button onClick={handleAddExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-gray-500">No work experience added yet.</p>
          <Button onClick={handleAddExperience} variant="outline" className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <Card key={experience.id}>
              <CardHeader className="py-4 px-6 flex flex-row justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">{experience.position}</h4>
                  <p className="text-gray-600">{experience.company}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditExperience(experience)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteExperience(experience.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{experience.location}</span>
                  <span>
                    {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                  </span>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{experience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <FormItem>
              <FormLabel htmlFor="company">Company</FormLabel>
              <FormControl>
                <Input
                  id="company"
                  name="company"
                  value={currentExperience.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
              </FormControl>
            </FormItem>
            
            <FormItem>
              <FormLabel htmlFor="position">Position</FormLabel>
              <FormControl>
                <Input
                  id="position"
                  name="position"
                  value={currentExperience.position}
                  onChange={handleInputChange}
                  placeholder="Job title"
                />
              </FormControl>
            </FormItem>
            
            <FormItem>
              <FormLabel htmlFor="location">Location</FormLabel>
              <FormControl>
                <Input
                  id="location"
                  name="location"
                  value={currentExperience.location}
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
                    value={currentExperience.startDate}
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
                    value={currentExperience.endDate}
                    onChange={handleInputChange}
                    disabled={currentExperience.current}
                  />
                </FormControl>
              </FormItem>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="current"
                name="current"
                type="checkbox"
                checked={currentExperience.current}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="current" className="text-sm font-medium text-gray-700">
                I currently work here
              </label>
            </div>
            
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  name="description"
                  value={currentExperience.description}
                  onChange={handleInputChange}
                  placeholder="Describe your responsibilities and achievements"
                  rows={4}
                />
              </FormControl>
            </FormItem>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveExperience}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceForm;