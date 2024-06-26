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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      className="flex w-full flex-col space-y-2"
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
                      className="flex w-full flex-col space-y-2"
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
                      className="flex w-full flex-col space-y-2"
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
                      className="flex w-full flex-col space-y-2"
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
          <Button type="submit">{t('Calculate')}</Button>
        </form>
      </Form>
    </>
  );
}
