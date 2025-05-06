import { CalculationResult } from '@types';
import { calculateNoAction } from './scenarios/calculate-result-no-action';
import { calculateOnlyRepayment } from './scenarios/calculate-result-only-repayment';
import { calculateOnlyInvesting } from './scenarios/calculate-result-only-investing';
import { calculateFiftyFifty } from './scenarios/calculate-result-fifty-fifty';

interface CalculateProps {
  yearPurchase: number;
  amountPaid: number;
  amountInDebt: number;
  interestRate: number;
  mortgageTermMonths: number;
  amountSaved: number;
  frequency: number;
  investmentAvgReturn: number;
}

export function calculate({
  yearPurchase,
  amountPaid,
  amountInDebt,
  interestRate,
  mortgageTermMonths,
  amountSaved = 0,
  frequency,
  investmentAvgReturn,
}: CalculateProps): CalculationResult {
  const houseValue = calculateHouseValuation(amountPaid, mortgageTermMonths, yearPurchase);

  const noActionDetails = calculateNoAction(houseValue, amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  const onlyRepaymentDetails = calculateOnlyRepayment(
    houseValue,
    amountInDebt,
    interestRate,
    mortgageTermMonths,
    amountSaved,
    frequency,
    noActionDetails
  );

  const onlyInvestingDetails = calculateOnlyInvesting(
    houseValue,
    mortgageTermMonths,
    amountSaved,
    frequency,
    investmentAvgReturn,
    noActionDetails
  );

  const halfAmountSaved = amountSaved / 2;
  const fiftyFiftyDetails = calculateFiftyFifty(
    houseValue,
    amountInDebt,
    interestRate,
    mortgageTermMonths,
    halfAmountSaved,
    frequency,
    investmentAvgReturn,
    noActionDetails
  );

  return {
    noAction: noActionDetails,
    onlyRepayment: onlyRepaymentDetails,
    onlyInvesting: onlyInvestingDetails,
    fiftyFifty: fiftyFiftyDetails,
  };
}

function calculateHouseValuation(amountPaid: number, mortgageTermMonths: number, yearPurchase: number): number {
  const annualInterestRate = 1.02;

  const today = new Date().getFullYear();
  const yearsLeftMortgage = mortgageTermMonths / 12;
  const yearsSincePurchase = today - yearPurchase;
  const mortgageTerm = yearsSincePurchase + yearsLeftMortgage;

  let houseValuation = amountPaid;

  for (let i = 0; i < mortgageTerm; i++) {
    houseValuation *= annualInterestRate;
  }

  return houseValuation;
}
