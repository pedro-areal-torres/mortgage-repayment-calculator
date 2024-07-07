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
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import { calculateMortgagePaymentDetails } from '../../utils/calculator.utils';
import { cn } from '../../lib/utils';

interface Props {
  setCalculationDetails: any;
}

const formSchema = z.object({
  debt: z.coerce.number(),
  interest: z.coerce.number(),
  term: z.coerce.number().gte(0),
  repayment: z.coerce.number().gte(0),
  spAvg: z.coerce.number().gte(0),
  //.transform((val) => (val === undefined ? null : val)),
});

export default function CalculatorForm({ setCalculationDetails }: Props) {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { debt, interest, term, repayment, spAvg } = values;

    const costNoRepayments = calculateMortgagePaymentDetails(
      debt,
      interest,
      term,
      spAvg
    );

    const costWithRepayments = calculateMortgagePaymentDetails(
      debt,
      interest,
      term,
      spAvg,
      repayment
    );
    setCalculationDetails({ costNoRepayments, costWithRepayments });
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
            name="debt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Amount in Debt')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      placeholder="150000"
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
                      placeholder="3.1"
                      {...field}
                      className="flex w-full flex-col"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Spread + Euribor</FormDescription>
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
                  <Input placeholder="360" {...field} />
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
                      placeholder="3000"
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
            name="spAvg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Expected Return SP')}</FormLabel>
                <FormControl>
                  <div className={cn('relative w-full rounded-md')}>
                    <Input
                      type="number"
                      step="any"
                      placeholder="shadcn"
                      defaultValue="5.68"
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
        <div className="flex flex-row gap-1 items-center">
          <svg
            fill="currentColor"
            color="gray"
            viewBox="0 0 16 16"
            height=".8rem"
            width=".8rem"
            className="hidden md:block"
          >
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          <p className="text-xs leading-6 text-slate-500">
            {t('Mortgage Calculator')}
          </p>
        </div>

        <Button type="submit">{t('Calculate')}</Button>
      </form>
    </Form>
  );
}
