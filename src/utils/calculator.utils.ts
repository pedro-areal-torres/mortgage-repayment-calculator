export interface CalculationResult {
  noAction: MortgageCalculationResult;
  onlyRepayment: MortgageCalculationResult;
  onlyInvesting: MortgageCalculationResult;
  fiftyFifty: MortgageCalculationResult;
}

export interface MortgageCalculationResult {
  assetsDetails: AssetsDetails;
  mortgageDetails: MortgageDetails;
  investmentDetails: InvestmentDetails;
}

export interface AssetsDetails {
  houseValue: number;
  savings: number;
}

export interface MortgageDetails {
  totalMonths: number;
  totalCost: number;
  totalInterest: number;
  totalSavedOnInterest: number;
  monthlyPayments: MonthlyPayments[];
  repaymentDetails: RepaymentDetails;
}

export interface MonthlyPayments {
  month: number;
  monthlyPayment: number;
  interestPaid: number;
  principalPaid: number;
  remainingDebt: number;
  monthlyPaymentReduction: number;
  monthlyPaymentSavedInterest: number;
  totalInterestSavedWithRepayment: number;
  returnOnRepaymentPercentage: number;
}

interface RepaymentDetails {
  amount: number;
  count: number;
}

interface InvestmentDetails {
  profit: number;
  invested: number;
}

// Main function to calculate mortgage payment details
export function calculate(
  // Calculate house value
  yearPurchase: number,
  amountPaid: number,
  // House mortgage
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  // Savings and return
  amountSaved: number = 0,
  frequency: number,
  investmentAvgReturn: number
): CalculationResult {
  const houseValue = calculateHouseValuation(amountPaid, mortgageTermMonths, yearPurchase);

  const noActionDetails = calculateNoAction(houseValue, amountInDebt, interestRate, mortgageTermMonths, amountSaved);

  const onlyRepaymentDetails = calculateOnlyRepayment(houseValue, amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  const onlyInvestingDetails = calculateOnlyInvesting(
    houseValue,
    mortgageTermMonths,
    amountSaved,
    frequency,
    investmentAvgReturn,
    noActionDetails,
    onlyRepaymentDetails
  );

  const halfAmountSaved = amountSaved / 2;
  const fiftyFiftyDetails = calculateFiftyFifty(
    houseValue,
    amountInDebt,
    interestRate,
    mortgageTermMonths,
    halfAmountSaved,
    frequency,
    investmentAvgReturn
  );

  return {
    noAction: noActionDetails,
    onlyRepayment: onlyRepaymentDetails,
    onlyInvesting: onlyInvestingDetails,
    fiftyFifty: fiftyFiftyDetails,
  };
}

// Calculate details for mortgage payments
function calculateMortgageDetails(
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  repayment: number,
  frequency: number
): MortgageDetails {
  const monthlyInterestRate = interestRate / 100 / 12;

  let monthlyPayment = calculateMonthlyPayment(amountInDebt, interestRate, mortgageTermMonths);

  // Costs
  let remainingDebt = amountInDebt;
  let totalMortgageCost = 0;
  let totalMortgageMonths = 0;

  // Repayments
  let countRepayments = 0;
  let totalRepayments = 0;

  const monthlyPayments: MonthlyPayments[] = [];

  for (let month = 1; month <= mortgageTermMonths; month++) {
    const remainingTerm = mortgageTermMonths - month;

    const previousMonthlyInterest = remainingDebt * monthlyInterestRate;
    const previousMonthlyPayment = calculateMonthlyPayment(remainingDebt, interestRate, remainingTerm);

    let hasRepayment = false;

    // Verificar: month !== 1
    if (repayment > 0 && month % frequency === 0) {
      hasRepayment = true;

      remainingDebt -= repayment * 0.98;
      const hasDebt = remainingDebt > 0;

      totalRepayments += hasDebt ? repayment : repayment + remainingDebt;

      totalMortgageCost += hasDebt ? repayment : repayment + remainingDebt;

      // Recalculated monthly payment after repayment
      const newMonthlyPayment = calculateMonthlyPayment(remainingDebt, interestRate, remainingTerm);

      monthlyPayment = newMonthlyPayment;

      countRepayments++;
    }

    const interestPaid = remainingDebt * monthlyInterestRate;
    const principalPaid = monthlyPayment - interestPaid;

    remainingDebt -= principalPaid;
    totalMortgageCost += remainingDebt < 0 ? monthlyPayment + remainingDebt : monthlyPayment;

    const monthlyPaymentReduction = hasRepayment ? previousMonthlyPayment - monthlyPayment : 0;
    const monthlyPaymentSavedInterest = hasRepayment ? previousMonthlyInterest - interestPaid : 0;
    const totalInterestSavedWithRepayment = hasRepayment ? Math.max(monthlyPaymentSavedInterest * remainingTerm - repayment, 0) : 0;
    const returnOnRepaymentPercentage = hasRepayment
      ? (((totalInterestSavedWithRepayment + repayment) * 100) / repayment - 100) / (remainingTerm / 12)
      : 0;

    totalMortgageMonths++;

    monthlyPayments.push({
      month,
      monthlyPayment,
      interestPaid,
      principalPaid,
      remainingDebt: Math.max(remainingDebt, 0),
      monthlyPaymentReduction,
      monthlyPaymentSavedInterest,
      totalInterestSavedWithRepayment,
      returnOnRepaymentPercentage,
    });

    if (remainingDebt <= 0) {
      break;
    }
  }

  return {
    totalMonths: totalMortgageMonths,
    totalCost: totalMortgageCost,
    totalInterest: totalMortgageCost - amountInDebt,
    totalSavedOnInterest: 0, // To be calculated outside
    monthlyPayments,
    repaymentDetails: {
      count: 0,
      amount: totalRepayments,
    },
  };
}

function calculateMonthlyPayment(remainingDebt: number, interestRate: number, remainingTerm: number) {
  const monthlyInterestRate = interestRate / 100 / 12;

  const monthlyPayment = (remainingDebt * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -remainingTerm));

  return monthlyPayment;
}

// Calculate total savings from investing with compounding interest
function calculateEarnedInvesting(totalYears: number, frequency: number, expectedRepayment: number, spAverageReturn: number): number {
  let totalSavedInvesting = 0;
  const compoundCount = (totalYears * 12) / frequency;

  for (let i = 1; i <= compoundCount; i++) {
    totalSavedInvesting +=
      totalSavedInvesting === 0 ? expectedRepayment : totalSavedInvesting * (spAverageReturn / 100) + expectedRepayment;
  }

  return totalSavedInvesting;
}

// Calculate the house valuation
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

// No Action (Nao investir nem Amortizar)
function calculateNoAction(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number
): MortgageCalculationResult {
  const mortgageTermYears = Math.floor(mortgageTermMonths / 12);
  const savings = amountSaved * mortgageTermYears;

  const mortgageDetails = calculateMortgageDetails(amountInDebt, interestRate, mortgageTermMonths, 0, 0);

  return {
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

function calculateOnlyRepayment(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number
): MortgageCalculationResult {
  const mortgageDetails = calculateMortgageDetails(amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  const termAntecipation = mortgageTermMonths - mortgageDetails.totalMonths;
  const savings = Math.ceil(termAntecipation) * amountSaved;

  return {
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

function calculateOnlyInvesting(
  houseValue: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number,
  investmentAvgReturn: number,
  noActionDetails: MortgageCalculationResult,
  onlyRepaymentDetails: MortgageCalculationResult
): MortgageCalculationResult {
  const { mortgageDetails: noActionMortage } = noActionDetails;
  const { mortgageDetails: onlyRepaymentMortgage } = onlyRepaymentDetails;

  const termAntecipation = mortgageTermMonths - onlyRepaymentMortgage.totalMonths;
  const savings = Math.ceil(termAntecipation) * amountSaved;

  const invested = onlyRepaymentMortgage.repaymentDetails.amount;
  const profit = calculateEarnedInvesting(termAntecipation, frequency, amountSaved, investmentAvgReturn);

  return {
    assetsDetails: {
      houseValue,
      savings,
    },
    mortgageDetails: noActionMortage,
    investmentDetails: {
      profit,
      invested,
    },
  };
}

function calculateFiftyFifty(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number,
  investmentAvgReturn: number
): MortgageCalculationResult {
  const mortgageDetails = calculateMortgageDetails(amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  const termAntecipation = mortgageTermMonths - mortgageDetails.totalMonths;
  const savings = Math.ceil(termAntecipation) * amountSaved * 2;

  const invested = mortgageDetails.repaymentDetails.amount;
  const profit = calculateEarnedInvesting(termAntecipation, frequency, amountSaved, investmentAvgReturn);

  return {
    assetsDetails: {
      houseValue,
      savings,
    },
    mortgageDetails,
    investmentDetails: {
      profit,
      invested,
    },
  };
}
