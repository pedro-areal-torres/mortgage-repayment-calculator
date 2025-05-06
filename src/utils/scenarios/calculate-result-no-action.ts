import { MortgageCalculationResult } from '@types';
import { calculateMortgageDetails } from '@utils/mortgage/calculate-mortage-details';

export function calculateNoAction(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number,
): MortgageCalculationResult {
  const savingsCount = mortgageTermMonths / frequency;
  const savingRounded = Math.floor(mortgageTermMonths / frequency);
  const savings =
    savingsCount - savingRounded === 0
      ? amountSaved * (savingRounded - 1)
      : amountSaved * savingRounded;

  const mortgageDetails = calculateMortgageDetails(
    amountInDebt,
    interestRate,
    mortgageTermMonths,
    0,
    0,
  );

  const earned = houseValue + savings;
  const costs = mortgageDetails.totalCost;

  return {
    overview: {
      earned,
      costs,
      net: earned - costs,
    },
    assetsDetails: {
      houseValue,
      savings,
    },
    mortgageDetails,
    investmentDetails: {
      profit: 0,
      invested: 0,
    },
  };
}
