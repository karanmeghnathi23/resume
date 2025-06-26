import React from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import { Card, CardContent } from '@/components/ui/Card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean, contemporary design with a sidebar for skills and contact info',
    thumbnail: 'https://placehold.co/300x400/2563eb/ffffff?text=Modern',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'A traditional resume layout with a professional appearance',
    thumbnail: 'https://placehold.co/300x400/1e293b/ffffff?text=Classic',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A simple, minimalist design focusing on content',
    thumbnail: 'https://placehold.co/300x400/64748b/ffffff?text=Minimal',
  },
];

const TemplateSelector: React.FC = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const selectedTemplate = resumeData.selectedTemplate || 'modern';

  const handleTemplateSelect = (templateId: string) => {
    updateResumeData({ selectedTemplate: templateId });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Choose a Template</h2>
      <p className="text-gray-600">Select a template that best represents your professional style.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md relative overflow-hidden",
              selectedTemplate === template.id && "ring-2 ring-primary"
            )}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;