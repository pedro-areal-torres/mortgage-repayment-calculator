export interface CalculationResult {
  noAction: MortgageCalculationResult;
  onlyRepayment: MortgageCalculationResult;
  onlyInvesting: MortgageCalculationResult;
}

export interface MortgagePaymentDetail {
  month: number;
  monthlyPayment: number;
  interestPaid: number;
  principalPaid: number;
  remainingDebt: number;
  returnOnRepayment: number;
  returnOnRepaymentPercentage: number;
}

interface RepaymentDetails {
  repaymentsCount: number;
  repaymentsAmount: number;
}

interface InvestmentDetails {
  totalEarnedOnSP: number;
  totalProfitSP: number;
}

export interface MortgageCalculationResult {
  paymentDetails: MortgagePaymentDetail[];
  repaymentDetails: RepaymentDetails;
  investmentDetails: InvestmentDetails;
  totalMonths: number;
  totalCost: number;
  totalAssets: number;
  totalSaved: number;
}

function calculateTotalAssets(amountPaid: number, years: number): number {
  const annualInterestRate = 0.02;
  let totalAssets = amountPaid;
  for (let i = 0; i < years; i++) {
    totalAssets *= 1 + annualInterestRate;
  }
  return totalAssets;
}

export function calculateMortgagePaymentDetails(
  amountInDebt: number,
  annualInterestRate: number,
  paymentTermInMonths: number,
  spAverageReturn: number,
  yearPurchase: number,
  amountPaid: number,
  frequency: number,
  expectedRepayment: number = 0
): CalculationResult {
  const today = new Date().getFullYear();
  const totalYears = paymentTermInMonths / 12;
  const yearsSincePurchase = today - yearPurchase;

  // No Action
  const noActionDetails = calculateDetails(
    amountInDebt,
    annualInterestRate,
    paymentTermInMonths,
    0
  );
  const totalAssetsNoAction = calculateTotalAssets(
    amountPaid,
    yearsSincePurchase + totalYears
  );

  // Only Repayment
  const onlyRepaymentDetails = calculateDetails(
    amountInDebt,
    annualInterestRate,
    paymentTermInMonths,
    expectedRepayment,
    frequency
  );
  const totalAssetsRepayment = calculateTotalAssets(
    amountPaid,
    yearsSincePurchase + totalYears
  );
  const totalSavedRepayment =
    noActionDetails.totalCost - onlyRepaymentDetails.totalCost;

  // Only Investing
  const totalInvested = onlyRepaymentDetails.repaymentDetails.repaymentsAmount;
  let totalAssetsInvesting = amountPaid;
  for (let i = 0; i < totalYears; i++) {
    totalAssetsInvesting =
      (totalAssetsInvesting + totalInvested / totalYears) *
      (1 + spAverageReturn / 100);
  }

  const onlyInvestingDetails = {
    ...noActionDetails,
    totalSaved:
      totalInvested * Math.pow(1 + spAverageReturn / 100, totalYears / 12),
  };

  return {
    noAction: {
      ...noActionDetails,
      totalAssets: totalAssetsNoAction,
      totalSaved: 0,
    },
    onlyRepayment: {
      ...onlyRepaymentDetails,
      totalAssets: totalAssetsRepayment,
      totalSaved: totalSavedRepayment,
    },
    onlyInvesting: {
      ...onlyInvestingDetails,
      totalAssets: totalAssetsInvesting,
    },
  };
}

function calculateDetails(
  amountInDebt: number,
  annualInterestRate: number,
  paymentTermInMonths: number,
  expectedRepayment: number,
  frequency: number = 12
): MortgageCalculationResult {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  let monthlyPayment =
    (amountInDebt * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -paymentTermInMonths));

  let remainingDebt = amountInDebt;
  let totalCost = 0;
  let totalMonths = 0;
  let repaymentsCount = 0;
  let repaymentsAmount = 0;
  let totalEarnedOnSP = 0;
  const spAverageReturnPercentage = 1 + 2 / 100; // Assume a 2% return

  const paymentDetails: MortgagePaymentDetail[] = [];

  for (let month = 1; month <= paymentTermInMonths; month++) {
    let returnOnRepayment = 0;
    let returnOnRepaymentPercentage = 0;

    if (month !== 1 && (month - 1) % frequency === 0 && expectedRepayment > 0) {
      remainingDebt -= expectedRepayment;

      repaymentsCount++;

      repaymentsAmount +=
        remainingDebt > 0
          ? expectedRepayment
          : expectedRepayment + remainingDebt;

      totalEarnedOnSP =
        (totalEarnedOnSP + expectedRepayment) * spAverageReturnPercentage;

      totalCost += expectedRepayment;
      if (remainingDebt <= 0) {
        remainingDebt = 0;
        break;
      }
      const remainingTerm = paymentTermInMonths - month;

      const newMonthlyPayment =
        (remainingDebt * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -remainingTerm));
      const monthlyPaymentReduction = monthlyPayment - newMonthlyPayment;

      const totalMonthlyReduction = monthlyPaymentReduction * remainingTerm;
      returnOnRepayment =
        (totalMonthlyReduction * 100) / expectedRepayment - 100;

      returnOnRepaymentPercentage =
        returnOnRepayment > 0 ? returnOnRepayment / (remainingTerm / 12) : 0;

      monthlyPayment = newMonthlyPayment;
    }

    const interestPaid = remainingDebt * monthlyInterestRate;
    const principalPaid = monthlyPayment - interestPaid;
    remainingDebt -= principalPaid;
    totalCost += monthlyPayment;

    totalMonths++;

    paymentDetails.push({
      month: month,
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      principalPaid: parseFloat(principalPaid.toFixed(2)),
      remainingDebt: parseFloat(Math.max(remainingDebt, 0).toFixed(2)), // Ensure debt doesn't go negative
      returnOnRepayment: parseFloat(returnOnRepayment.toFixed(2)),
      returnOnRepaymentPercentage: parseFloat(
        returnOnRepaymentPercentage.toFixed(2)
      ),
    });

    if (remainingDebt <= 0) {
      break;
    }
  }

  return {
    paymentDetails,
    repaymentDetails: { repaymentsCount, repaymentsAmount },
    investmentDetails: {
      totalEarnedOnSP,
      totalProfitSP: totalEarnedOnSP - repaymentsAmount,
    },
    totalMonths: parseFloat(totalMonths.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    totalAssets: 0, // To be calculated outside
    totalSaved: 0, // To be calculated outside
  };
}
