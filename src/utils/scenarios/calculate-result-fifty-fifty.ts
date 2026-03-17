import { MortgageCalculationResult } from '@types';
import { calculateEarnedInvesting } from '@utils/investing/calculate-earned-investing';
import { calculateInterestSavedIfKeepPayment } from '@utils/mortgage/calculate-interest-saved-keep-repayment';
import { calculateMortgageDetails } from '@utils/mortgage/calculate-mortage-details';

export function calculateFiftyFifty(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number,
  investmentAvgReturn: number,
  noActionDetails: MortgageCalculationResult,
): MortgageCalculationResult {
  const mortgageDetails = calculateMortgageDetails(
    amountInDebt,
    interestRate,
    mortgageTermMonths,
    amountSaved,
    frequency,
  );

  const termAntecipation = mortgageTermMonths - mortgageDetails.totalMonths;
  const investingMonths = mortgageTermMonths - termAntecipation;

  const { assetsDetails: noActionAssets } = noActionDetails;

  const interestSavedIfKeepPayment = calculateInterestSavedIfKeepPayment({
    amountInDebt,
    interestRate,
    repayment: amountSaved,
    frequency,
    monthlyPayments: noActionDetails.mortgageDetails.monthlyPayments,
    interestPaid: mortgageDetails.totalInterest,
  });

  const invested = mortgageDetails.repaymentDetails.amount;
  const earnedInvestment = calculateEarnedInvesting(
    investingMonths,
    frequency,
    amountSaved,
    investmentAvgReturn,
  );

  const profit = earnedInvestment - invested;

  const savings = noActionAssets.savings - mortgageDetails.repaymentDetails.amount - invested;

  const earned = houseValue + mortgageDetails.totalSavedOnInterest + profit + savings + invested;
  const costs = mortgageDetails.totalCost + 0.28 * profit;

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
    mortgageDetails: {
      ...mortgageDetails,
      interestSavedIfKeepPayment,
    },
    investmentDetails: {
      profit,
      invested,
    },
  };
}
