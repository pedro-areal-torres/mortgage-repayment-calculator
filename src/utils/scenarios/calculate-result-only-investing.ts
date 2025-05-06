import { MortgageCalculationResult } from '@types';
import { calculateEarnedInvesting } from '@utils/investing/calculate-earned-investing';

export function calculateOnlyInvesting(
  houseValue: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number,
  investmentAvgReturn: number,
  noActionDetails: MortgageCalculationResult
): MortgageCalculationResult {
  const { mortgageDetails: noActionMortage } = noActionDetails;

  // const termAntecipation = mortgageTermMonths - onlyRepaymentMortgage.totalMonths;
  // const investingMonths = mortgageTermMonths - termAntecipation;
  // const savings = Math.floor(termAntecipation / frequency) * amountSaved;

  const invested = noActionDetails.assetsDetails.savings;
  const earnedInvestment = calculateEarnedInvesting(mortgageTermMonths, frequency, amountSaved, investmentAvgReturn);
  const profit = earnedInvestment - invested;

  //const earned = houseValue + profit + savings;
  const earned = houseValue + profit;
  const costs = noActionMortage.totalCost + 0.28 * profit;

  return {
    overview: {
      earned,
      costs,
      net: earned - costs,
    },
    assetsDetails: {
      houseValue,
      savings: 0,
    },
    mortgageDetails: noActionMortage,
    investmentDetails: {
      profit,
      invested,
    },
  };
}
