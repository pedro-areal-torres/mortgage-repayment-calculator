export interface CalculationResult {
  noAction: MortgageCalculationResult;
  onlyRepayment: MortgageCalculationResult;
  onlyInvesting: MortgageCalculationResult;
  fiftyFifty: MortgageCalculationResult;
}

export interface MortgageCalculationResult {
  overview: OverviewDetails;
  assetsDetails: AssetsDetails;
  mortgageDetails: MortgageDetails;
  investmentDetails: InvestmentDetails;
}

interface OverviewDetails {
  earned: number;
  costs: number;
  net: number;
}

interface AssetsDetails {
  houseValue: number;
  savings: number;
}

interface MortgageDetails {
  totalMonths: number;
  totalCost: number;
  totalInterest: number;
  totalDebt: number;
  totalSavedOnInterest: number;
  monthlyPayments: MonthlyPayments[];
  repaymentDetails: RepaymentDetails;
}

interface MonthlyPayments {
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

  const noActionDetails = calculateNoAction(houseValue, amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  const onlyRepaymentDetails = calculateOnlyRepayment(houseValue, amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

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

  for (let month = 0; month < mortgageTermMonths; month++) {
    const remainingTerm = mortgageTermMonths - month;

    const previousMonthlyInterest = remainingDebt * monthlyInterestRate;
    const previousMonthlyPayment = calculateMonthlyPayment(remainingDebt, interestRate, remainingTerm);

    let hasRepayment = false;

    // Verificar:
    if (repayment > 0 && month !== 0 && month % frequency === 0) {
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
    const totalInterestSavedWithRepayment = hasRepayment ? Math.max(monthlyPaymentSavedInterest * remainingTerm, 0) : 0;
    // Dúvida: const totalInterestSavedWithRepayment = hasRepayment ? Math.max(monthlyPaymentSavedInterest * remainingTerm - repayment, 0) : 0;
    const returnOnRepaymentPercentage = hasRepayment
      ? (((totalInterestSavedWithRepayment + repayment) * 100) / repayment - 100) / (remainingTerm / 12)
      : 0;

    totalMortgageMonths++;

    monthlyPayments.push({
      month: month + 1,
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

  const totalSavedOnInterest = monthlyPayments.reduce((prev, curr) => (prev += curr.totalInterestSavedWithRepayment), 0);

  return {
    totalMonths: totalMortgageMonths,
    //totalCost: totalMortgageCost,
    totalCost: totalMortgageCost,
    totalDebt: amountInDebt,
    totalInterest: totalMortgageCost - amountInDebt,
    totalSavedOnInterest,
    monthlyPayments,
    repaymentDetails: {
      count: countRepayments,
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
function calculateEarnedInvesting(totalMonths: number, frequency: number, expectedRepayment: number, spAverageReturn: number): number {
  let totalSavedInvesting = 0;

  for (let i = 12; i <= totalMonths; i += 12) {
    const yearlyProfit = totalSavedInvesting === 0 ? expectedRepayment : totalSavedInvesting * (spAverageReturn / 100);
    const addRepayment = totalSavedInvesting !== 0 && i % frequency === 0 ? expectedRepayment : 0;
    totalSavedInvesting += yearlyProfit + addRepayment;
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
  amountSaved: number,
  frequency: number
): MortgageCalculationResult {
  const savingsCount = Math.floor(mortgageTermMonths / frequency);
  const savings = amountSaved * savingsCount;

  const mortgageDetails = calculateMortgageDetails(amountInDebt, interestRate, mortgageTermMonths, 0, 0);

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

function calculateOnlyRepayment(
  houseValue: number,
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  amountSaved: number,
  frequency: number
): MortgageCalculationResult {
  const mortgageDetails = calculateMortgageDetails(amountInDebt, interestRate, mortgageTermMonths, amountSaved, frequency);

  // const savingsCount = Math.floor(mortgageTermMonths / frequency);
  // const savings = amountSaved * savingsCount - mortgageDetails.repaymentDetails.amount;

  // const earned = houseValue + mortgageDetails.totalSavedOnInterest + savings;
  const earned = houseValue + mortgageDetails.totalSavedOnInterest;
  const costs = mortgageDetails.totalCost;

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
  const investingMonths = mortgageTermMonths - termAntecipation;

  // const savingsCount = Math.floor(mortgageTermMonths / frequency);
  // const savings = (amountSaved * savingsCount - mortgageDetails.repaymentDetails.amount) * 2;

  const invested = mortgageDetails.repaymentDetails.amount;
  const earnedInvestment = calculateEarnedInvesting(investingMonths, frequency, amountSaved, investmentAvgReturn);
  const profit = earnedInvestment - invested;

  // const earned = houseValue + mortgageDetails.totalSavedOnInterest + profit + savings;
  const earned = houseValue + mortgageDetails.totalSavedOnInterest + profit;
  const costs = mortgageDetails.totalCost + 0.28 * profit;

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
    mortgageDetails,
    investmentDetails: {
      profit,
      invested,
    },
  };
}
