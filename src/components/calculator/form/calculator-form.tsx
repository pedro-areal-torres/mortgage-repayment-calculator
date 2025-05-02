import { Button } from '@components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

import { Input } from '@components/ui/input';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils';
import CalculatorInfoOAFIcon from '../../icons/calculator-info-oaf-icon';
import { useCalculatorForm } from './use-calculator-form';

interface Props {
  setCalculationDetails: any;
}

export default function CalculatorForm({ setCalculationDetails }: Props) {
  const { t } = useTranslation();

  const { form, onSubmit } = useCalculatorForm(setCalculationDetails);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="yearPurchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Year of Purchase')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input type="number" placeholder="2024" {...field} className="flex w-full flex-col" />
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
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
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

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
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
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-end">
          <div className="hidden sm:flex sm:flex-col w-full">
            <CalculatorInfoOAFIcon />
          </div>
          <p className="w-full text-xs leading-6 text-slate-500 italic flex flex-row gap-1 justify-end">
            {t('Design')}: <a href="https://www.linkedin.com/in/pedro-areal-torres/">Pedro Torres</a>
          </p>
        </div>

        <Button type="submit" className="bg-green-400 font-bold hover:bg-green-500 text-black">
          {t('Calculate')}
        </Button>
      </form>
    </Form>
  );
}
