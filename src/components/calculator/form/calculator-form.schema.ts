import { z } from 'zod';

const year = new Date().getFullYear();
const MAX_AMOUNT = 10000000;

export const calculatorFormSchema = z
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
    amountPaid: z.union([z.nan(), z.coerce.number().positive().min(1).max(MAX_AMOUNT)]),
    amountInDebt: z.union([z.nan(), z.coerce.number().positive().min(1).max(MAX_AMOUNT)]),
    interestRate: z.union([z.nan(), z.coerce.number().positive().min(1).max(20)]),
    mortgageTermMonths: z.union([z.nan(), z.coerce.number().int().positive().min(1).max(480)]),
    amountSaved: z.union([z.nan(), z.coerce.number().positive().min(0).max(MAX_AMOUNT)]),
    investmentAvgReturn: z.union([z.nan(), z.coerce.number().positive().min(0).max(100)]),
    frequency: z.number(),
  })
  .refine((data) => data.amountInDebt >= data.amountSaved, {
    path: ['amountSaved'],
    message: 'Repayment should be lower than debt',
  })
  .refine((data) => data.amountPaid >= data.amountInDebt, {
    path: ['amountSaved'],
    message: 'Amount paid should be higher than debt',
  });
