import { useTranslation } from 'react-i18next';
import './App.css';
import LanguageSwitcher from './components/language-switcher/language-switcher';
import Calculator from './components/pages/calculator';
import CalculatorTable from './components/calculator-table/calculator-table';
import { CalculationResult } from './utils/calculator.utils';
import React from 'react';
import Maintenance from './components/maintenance/maintenance';

function App() {
  const { t } = useTranslation();

  const [calculation, setCalculationDetails] = React.useState<CalculationResult>();

  const maintenance = false;

  return (
    <>
      {maintenance ? (
        <Maintenance />
      ) : (
        <div className="bg-gray-100">
          <div className="min-h-screen py-2 px-4 m-auto max-w-4xl">
            <div className="flex flex-row gap-2 justify-between px-2 items-center py-2">
              <h2 className="text-xl font-bold leading-7 text-green-500">{t('Repayment vs Investing')}</h2>
              <LanguageSwitcher />
            </div>
            <div className="bg-white shadow-md ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <Calculator setCalculationDetails={setCalculationDetails} />
            </div>
            <CalculatorTable calculation={calculation} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
