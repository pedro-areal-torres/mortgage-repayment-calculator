import { useTranslation } from 'react-i18next';
import './App.css';
import LanguageSwitcher from './components/language-switcher/language-switcher';
import Calculator from './components/pages/calculator';
import CalculatorTable from './components/calculator-table/calculator-table';
import { MortgageCalculationResult } from './utils/calculator.utils';
import React from 'react';

export interface CalculationResult {
  costNoRepayments: MortgageCalculationResult;
  costWithRepayments: MortgageCalculationResult;
}

function App() {
  const { t } = useTranslation();
  const [calculation, setCalculationDetails] =
    React.useState<CalculationResult>();

  return (
    <div className="min-h-screen py-2 px-4 max-w-3xl m-auto">
      <div className="flex flex-row gap-2 justify-between px-2 items-center py-2">
        <h2 className="text-base font-bold leading-7 text-gray-900">
          {t('Mortgage Simulator')}
        </h2>
        <LanguageSwitcher />
      </div>
      <div className="bg-white shadow-md ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <Calculator setCalculationDetails={setCalculationDetails} />
      </div>
      <CalculatorTable calculation={calculation} />
    </div>
  );
}

export default App;
