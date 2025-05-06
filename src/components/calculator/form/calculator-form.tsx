import { Button } from '@components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

import { Input } from '@components/ui/input';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils';
import { useCalculatorForm } from './use-calculator-form';
import { Dispatch, SetStateAction } from 'react';
import { CalculationResult } from '@types';

interface Props {
  calculation: CalculationResult | undefined;
  setCalculationDetails: Dispatch<SetStateAction<CalculationResult | undefined>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function CalculatorForm({ setCalculationDetails, setShowForm }: Props) {
  const { t } = useTranslation();

  const { form, onSubmit } = useCalculatorForm({ setCalculationDetails, setShowForm });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
          <FormField
            control={form.control}
            name="yearPurchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Year of Purchase')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" placeholder="2025" {...field} className="flex w-full flex-col" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountPaid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Amount Paid')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" placeholder="200000" {...field} className="flex w-full flex-col" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
          <FormField
            control={form.control}
            name="amountInDebt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Amount in Debt')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" placeholder="180000" {...field} className="flex w-full flex-col" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Annual Interest Rate')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" step="any" placeholder="5" {...field} className="flex w-full flex-col" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mortgageTermMonths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Payment Term (months)')}</FormLabel>
                <FormControl>
                  <Input placeholder="420" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
          <FormField
            control={form.control}
            name="amountSaved"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Saving for repayment')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" step="any" placeholder="1000" {...field} className="flex w-full flex-col" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Frequency')}</FormLabel>
                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={''} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="12">{t('Anual')}</SelectItem>
                    <SelectItem value="24">{t('2 by 2 y')}</SelectItem>
                    <SelectItem value="36">{t('3 by 3 y')}</SelectItem>
                    <SelectItem value="60">{t('5 by 5 y')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="investmentAvgReturn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Expected Return')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" step="any" placeholder="5.9" {...field} className="flex w-full flex-col" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="hidden sm:flex flex-col sm:flex-row justify-start sm:justify-between items-end">
          <div className="flex flex-row gap-1 items-start sm:items-center">
            <svg fill="currentColor" color="gray" viewBox="0 0 16 16" height=".8rem" width=".8rem" className="mt-1.5 sm:mt-0">
              <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <p className="text-xs leading-6 text-slate-500">
              {t('Mortgage Calculator')}
              <a href="https://www.oamadorfinanceiro.pt/p/3907c638-b851-4801-b569-e8c83066e8ae" className="underline">
                Amortizar vs Investir
              </a>
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-green-500 transition duration-300 ease-in-out font-bold hover:bg-green-600 text-white hover:text-black"
        >
          {t('Calculate')}
        </Button>
      </form>
    </Form>
  );
}
