import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
}

const initialResumeData: ResumeData = {
  selectedTemplate: 'modern',
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  languages: '',
  interests: '',
};

export const useResumeData = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      updateResumeData: (data) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            ...data,
          },
        })),
      resetResumeData: () => set({ resumeData: initialResumeData }),
    }),
    {
      name: 'resume-storage',
    }
  )
);