import { MortgageCalculationResult } from '@types';
import { calculateMortgageDetails } from '@utils/mortgage/calculate-mortage-details';

export function calculateOnlyRepayment(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number,
  noActionDetails: MortgageCalculationResult
): MortgageCalculationResult {
  const mortgageDetails = calculateMortgageDetails(amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  const { assetsDetails: noActionAssets } = noActionDetails;
  const savings = noActionAssets.savings - mortgageDetails.repaymentDetails.amount;

  const earned = houseValue + mortgageDetails.totalSavedOnInterest + savings;
  const costs = mortgageDetails.totalCost;

  return {
    overview: {
      earned,
      costs,
      net: earned - costs,
    },
    assetsDetails: {
      houseValue,
      savings: savings,
    },
    mortgageDetails,
    investmentDetails: {
      profit: 0,
      invested: 0,
    },
  };
}
