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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

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

interface Props {
  setCalculationDetails: any;
}

const formSchema = z.object({
  yearPurchase: z.union([z.nan(), z.coerce.number().int().positive().min(1)]),
  amountPaid: z.union([z.nan(), z.coerce.number().positive().min(1)]),
  debt: z.union([z.nan(), z.coerce.number().positive().min(1)]),
  interest: z.union([z.nan(), z.coerce.number().positive().min(1)]),
  term: z.union([z.nan(), z.coerce.number().int().positive().min(1)]),
  repayment: z.union([z.nan(), z.coerce.number().positive().min(1)]),
  spAvg: z.union([z.nan(), z.coerce.number().positive().min(1)]),
  frequency: z.string(),
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
          <div className="flex flex-row gap-1 items-start sm:items-center">
            <svg
              fill="currentColor"
              color="gray"
              viewBox="0 0 16 16"
              height=".8rem"
              width=".8rem"
              className="mt-1.5 sm:mt-0"
            >
              <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <p className="text-xs leading-6 text-slate-500">
              {t('Mortgage Calculator')}
              <a href="" className="underline">
                Amortizar vs Investir
              </a>
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="text-xs leading-6 text-slate-500 hover:cursor-default"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex flex-row gap-1 items-start sm:items-center">
                  {t('Read Disclaimer')}
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="gray"
                    height="1rem"
                    width="1rem"
                  >
                    <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
                  </svg>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-72">
                {t('Disclaimer')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
