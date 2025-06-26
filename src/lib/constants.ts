export const RESUME_SECTIONS = {
  PERSONAL_INFO: 'personalInfo',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  LANGUAGES: 'languages',
  INTERESTS: 'interests',
};

export const SKILL_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
};

export const TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal',
};

export const PDF_EXPORT_OPTIONS = {
  SCALE: 2,
  FORMAT: 'a4',
  ORIENTATION: 'portrait',
  UNIT: 'pt',
  QUALITY: 1.0,
};

export const ANIMATION_VARIANTS = {
  FADE_IN: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  FADE_IN_UP: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  SCALE_IN: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
};