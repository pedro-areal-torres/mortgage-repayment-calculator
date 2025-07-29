import { MonthlyPaymentDetails } from '@types';

export function calculateInterestSavedIfKeepPayment({
  amountInDebt,
  interestRate,
  repayment,
  frequency,
  interestPaid,
  monthlyPayments,
}: {
  amountInDebt: number;
  interestRate: number;
  repayment: number;
  frequency: number;
  interestPaid: number;
  monthlyPayments: MonthlyPaymentDetails[];
}): number {
  const monthlyInterestRate = interestRate / 100 / 12;

  let remainingDebt = amountInDebt;
  let totalInterestNew = 0;

  let month = 0;
  while (remainingDebt > 0 && month < 1000) {
    month += 1;

    if (repayment > 0 && month % frequency === 0) {
      remainingDebt -= repayment * 0.98; // 2% penalty
    }

    const interestPaid = remainingDebt * monthlyInterestRate;
    const monthlyPayment = monthlyPayments[0].monthlyPayment; // keep initial payment
    const principalPaid = monthlyPayment - interestPaid;

    totalInterestNew += interestPaid;
    remainingDebt -= principalPaid;
  }

  return Math.max(0, interestPaid - totalInterestNew);
}
