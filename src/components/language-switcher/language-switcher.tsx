import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { ES, PT, US } from 'country-flag-icons/react/3x2';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button variant="ghost" size="icon" onClick={() => changeLanguage('pt')}>
        <PT title="Português" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => changeLanguage('es')}>
        <ES title="Español" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => changeLanguage('en')}>
        <US title="English" />
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
