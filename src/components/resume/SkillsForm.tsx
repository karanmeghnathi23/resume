import React, { useState } from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormItem, FormLabel, FormControl } from '@/components/ui/Form';
import { X, Plus } from 'lucide-react';
import { Select } from '@/components/ui/Select';

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const SkillsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('Intermediate');

  const skills = resumeData.skills || [];

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    
    const newSkillItem: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: skillLevel,
    };
    
    updateResumeData({
      skills: [...skills, newSkillItem],
    });
    
    setNewSkill('');
  };

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    updateResumeData({ skills: updatedSkills });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      case 'Expert':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Skills</h3>
        <p className="text-gray-600 mb-6">
          Add skills that showcase your strengths and expertise.
        </p>
        
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Input
              placeholder="Add a skill (e.g., JavaScript, Project Management)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <div className="w-40">
            <Select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value as Skill['level'])}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </Select>
          </div>
          
          <Button onClick={handleAddSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-3">Your Skills</h4>
        
        {skills.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-gray-500">No skills added yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getLevelColor(skill.level)}`}
              >
                {skill.name}
                <span className="ml-1 text-xs">({skill.level})</span>
                <button
                  type="button"
                  className="ml-2 focus:outline-none"
                  onClick={() => handleRemoveSkill(skill.id)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Languages</h3>
        
        <FormItem>
          <FormLabel>Add languages you speak</FormLabel>
          <FormControl>
            <Input 
              placeholder="Add languages separated by commas (e.g., English, Spanish, French)"
              value={resumeData.languages || ''}
              onChange={(e) => updateResumeData({ languages: e.target.value })}
            />
          </FormControl>
        </FormItem>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Interests</h3>
        
        <FormItem>
          <FormLabel>Add your interests or hobbies</FormLabel>
          <FormControl>
            <Input 
              placeholder="Add interests separated by commas (e.g., Reading, Hiking, Photography)"
              value={resumeData.interests || ''}
              onChange={(e) => updateResumeData({ interests: e.target.value })}
            />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
};

export default SkillsForm;