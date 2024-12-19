import React, { createContext, useContext, useState } from 'react';
import { Language } from '../i18n/types';

interface LanguageContextType {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    // Usar localStorage para persistir a escolha do idioma
    const savedLanguage = localStorage.getItem('selectedLanguage');
    return (savedLanguage as Language) || "pt-BR";
  });

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};