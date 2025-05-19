import { useTranslation } from 'react-i18next';

import { useCalculator } from '@context/useCalculator';

import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';

import { useCalculatorForm } from './use-calculator-form';
import FormInputField from './components/form-input-field';
import FormSelectField from './components/form-select-field';

export default function CalculatorForm() {
  const { t } = useTranslation();
  const { setCalculation, setShowForm } = useCalculator();
  const { form, onSubmit } = useCalculatorForm({ setCalculation, setShowForm });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start w-full gap-4'
      >
        <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
          <FormInputField
            name='yearPurchase'
            control={form.control}
            placeholder='2025'
            label='Year of Purchase'
            autoFocus
          />
          <FormInputField
            name='amountPaid'
            control={form.control}
            placeholder='200000'
            adornment='€'
            label='Amount Paid'
          />
        </div>

        <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
          <FormInputField
            name='amountInDebt'
            control={form.control}
            placeholder='180000'
            adornment='€'
            label='Amount in Debt'
          />
          <FormInputField
            name='interestRate'
            control={form.control}
            placeholder='5'
            adornment='%'
            step='any'
            label='Annual Interest Rate'
          />
          <FormInputField
            name='mortgageTermMonths'
            control={form.control}
            placeholder='420'
            label='Payment Term (months)'
          />
        </div>

        <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
          <FormInputField
            name='amountSaved'
            control={form.control}
            placeholder='1000'
            adornment='€'
            step='any'
            label='Saving for repayment'
          />
          <FormSelectField
            name='frequency'
            control={form.control}
            label='Frequency'
            options={[
              { value: '12', label: 'Anual' },
              { value: '24', label: '2 by 2 y' },
              { value: '36', label: '3 by 3 y' },
              { value: '60', label: '5 by 5 y' },
            ]}
          />
          <FormInputField
            name='investmentAvgReturn'
            control={form.control}
            placeholder='5.9'
            adornment='%'
            step='any'
            label='Expected Return'
          />
        </div>

        <div className='hidden sm:flex flex-col sm:flex-row justify-start sm:justify-between items-end'>
          <div className='flex flex-row gap-1 items-start sm:items-center'>
            <svg
              fill='currentColor'
              color='gray'
              viewBox='0 0 16 16'
              height='.8rem'
              width='.8rem'
              className='mt-1.5 sm:mt-0'
            >
              <path d='M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z' />
            </svg>
            <p className='text-xs leading-6 text-slate-500'>
              {t('Mortgage Calculator')}{' '}
              <a
                href='https://www.oamadorfinanceiro.pt/p/3907c638-b851-4801-b569-e8c83066e8ae'
                className='underline'
              >
                Amortizar vs Investir
              </a>
            </p>
          </div>
        </div>

        <Button
          type='submit'
          className='bg-green-500 transition duration-300 ease-in-out font-bold hover:bg-green-600 text-white hover:text-black'
        >
          {t('Calculate')}
        </Button>
      </form>
    </Form>
  );
}
