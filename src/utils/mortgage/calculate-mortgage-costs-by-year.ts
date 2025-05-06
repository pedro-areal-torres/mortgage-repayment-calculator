import { MonthlyPaymentDetails } from '@types';

interface Props {
  mortgageDetails: MonthlyPaymentDetails[];
  year: number;
}

export function calculateMortgageCostsByYear({ mortgageDetails, year }: Props) {
  const yearPayments = mortgageDetails.filter((payment) => payment.year === year);
  const totalCost = yearPayments.reduce((acc, curr) => (acc += curr.interestPaid), 0);
  return totalCost;
}
