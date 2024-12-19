import { useCallback } from 'react';
import { translations } from './translations';
import { Language } from './types';

export const useTranslation = (selectedLanguage: Language) => {
  const t = useCallback((key: keyof typeof translations[Language]) => {
    return translations[selectedLanguage]?.[key] || key;
  }, [selectedLanguage]);

  return { t };
};