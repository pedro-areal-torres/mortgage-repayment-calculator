'use client';

import { useState } from 'react';
import { CalculationResult } from '@utils/calculator.utils';
import LanguageSwitcher from '@components/language-switcher/language-switcher';
import CalculatorResultsTable from '@components/calculator/results-table/results-table';
import CalculatorForm from '@components/calculator/form/calculator-form';

export default function Body() {
  const [calculation, setCalculationDetails] = useState<CalculationResult>();

  return (
    <main className="...">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <LanguageSwitcher />
        <div className="bg-white shadow-md ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="p-4">
            <CalculatorForm setCalculationDetails={setCalculationDetails} />
          </div>
        </div>
        <CalculatorResultsTable calculation={calculation} />
      </div>
    </main>
  );
}
