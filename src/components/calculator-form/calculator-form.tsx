import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import { calculateMortgagePaymentDetails } from '../../utils/calculator.utils';
import { cn } from '../../lib/utils';
import CalculatorInfoDisclaimer from '../calculator-info/calculator-info-disclaimer';
import CalculatorInfoOAF from '../calculator-info/calculator-info-oaf';

interface Props {
  setCalculationDetails: any;
}

const year = new Date().getFullYear();

const formSchema = z
  .object({
    yearPurchase: z.union([
      z.nan(),
      z.coerce
        .number()
        .int()
        .positive()
        .min(year - 40)
        .max(year),
    ]),
    amountPaid: z.union([
      z.nan(),
      z.coerce.number().positive().min(1).max(10000000),
    ]),
    debt: z.union([z.nan(), z.coerce.number().positive().min(1).max(10000000)]),
    interest: z.union([z.nan(), z.coerce.number().positive().min(1).max(20)]),
    term: z.union([
      z.nan(),
      z.coerce.number().int().positive().min(1).max(480),
    ]),
    repayment: z.union([
      z.nan(),
      z.coerce.number().positive().min(0).max(10000000),
    ]),
    spAvg: z.union([z.nan(), z.coerce.number().positive().min(0).max(100)]),
    frequency: z.string(),
  })
  .refine((data) => (data.debt < data.repayment ? false : true), {
    path: ['repayment'],
    message: 'Repayment should be lower than debt',
  })
  .refine((data) => (data.amountPaid < data.debt ? false : true), {
    path: ['repayment'],
    message: 'Amuont paid should be higher than debt',
  });

export default function CalculatorForm({ setCalculationDetails }: Props) {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      yearPurchase,
      amountPaid,
      debt,
      interest,
      term,
      repayment,
      spAvg,
      frequency,
    } = values;

    const calculation = calculateMortgagePaymentDetails(
      debt,
      interest,
      term,
      spAvg,
      yearPurchase,
      amountPaid,
      Number(frequency),
      repayment
    );

    console.log({ calculation });

    setCalculationDetails(calculation);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start w-full gap-4"
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="yearPurchase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Year of Purchase')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      placeholder="2024"
                      {...field}
                      className="flex w-full flex-col"
                    />
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
                    <Input
                      type="number"
                      placeholder="200000"
                      {...field}
                      className="flex w-full flex-col"
                    />
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
            name="debt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Amount in Debt')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      placeholder="180000"
                      {...field}
                      className="flex w-full flex-col"
                    />
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
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Annual Interest Rate')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      step="any"
                      placeholder="5"
                      {...field}
                      className="flex w-full flex-col"
                    />
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
            name="term"
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
            name="repayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Expected Repayment every 12 months')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      step="any"
                      placeholder="1000"
                      {...field}
                      className="flex w-full flex-col"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>{t('Saving for repayment')}</FormDescription>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            name="spAvg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Expected Return')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      step="any"
                      placeholder="5.9"
                      {...field}
                      className="flex w-full flex-col"
                    />
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
        <div className="flex flex-row justify-between">
          <CalculatorInfoOAF />
          <CalculatorInfoDisclaimer />
        </div>

        <Button
          type="submit"
          className="bg-green-400 font-bold hover:bg-green-500 text-black"
        >
          {t('Calculate')}
        </Button>
      </form>
    </Form>
  );
}
