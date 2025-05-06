import CalculatorResults from '@components/calculator/results/results';
import CalculatorForm from '@components/calculator/form/calculator-form';
import { cn } from '@lib/tw-merge';
import { useCalculator } from '@context/useCalculator';

export default function Body() {
  const { calculation, showForm } = useCalculator();

  return (
    <main className='flex flex-row h-full items-center justify-center gap-6 grow px-6 lg:px-8'>
      <div
        className={cn(
          'w-full lg:max-w-3xl',
          calculation && 'hidden 2xl:block',
          showForm && 'block',
        )}
      >
        <div className='bg-white shadow-md ring-1 ring-gray-900/5 sm:rounded-xl'>
          <div className='p-4'>
            <CalculatorForm />
          </div>
        </div>
      </div>
      {calculation && !showForm && (
        <div className={'w-full h-full'}>
          <CalculatorResults />
        </div>
      )}
    </main>
  );
}
