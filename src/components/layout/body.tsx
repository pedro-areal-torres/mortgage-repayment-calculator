import { useState } from 'react';
import CalculatorResults from '@components/calculator/results/results';
import CalculatorForm from '@components/calculator/form/calculator-form';
import { CalculationResult } from '@types';
import { cn } from '@lib/utils';

export default function Body() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [calculation, setCalculationDetails] = useState<CalculationResult>();

  return (
    <main className="flex flex-row h-full items-center justify-center gap-6 grow px-6 lg:px-8">
      <div className={cn('w-full lg:max-w-3xl', calculation && 'hidden 2xl:block', showForm && 'block')}>
        <div className="bg-white shadow-md ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="p-4">
            <CalculatorForm calculation={calculation} setCalculationDetails={setCalculationDetails} setShowForm={setShowForm} />
          </div>
        </div>
      </div>
      {calculation && !showForm && (
        <div className={'w-full h-full'}>
          <CalculatorResults calculation={calculation} setShowForm={setShowForm} />
        </div>
      )}
    </main>
  );
}
