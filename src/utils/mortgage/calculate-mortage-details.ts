import { MonthlyPaymentDetails, MortgageDetails } from '@types';

export function calculateMortgageDetails(
  amountInDebt: number,
  interestRate: number,
  mortgageTermMonths: number,
  repayment: number,
  frequency: number,
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

  const monthlyPayments: MonthlyPaymentDetails[] = [];
  let lastRepaymentAmount = 0;
  let leftOverFromLastRepayment = 0;
  let year = new Date().getFullYear();

  for (let month = 0; month < mortgageTermMonths; month++) {
    const remainingTerm = mortgageTermMonths - month;

    const previousMonthlyInterest = remainingDebt * monthlyInterestRate;
    const previousMonthlyPayment = calculateMonthlyPayment(
      remainingDebt,
      interestRate,
      remainingTerm,
    );

    let hasRepayment = false;

    if (repayment > 0 && month !== 0 && month % frequency === 0) {
      hasRepayment = true;

      remainingDebt -= repayment * 0.98;
      const hasDebt = remainingDebt > 0;

      lastRepaymentAmount = !hasDebt ? repayment + remainingDebt : 0;
      leftOverFromLastRepayment = lastRepaymentAmount != 0 ? repayment - lastRepaymentAmount : 0;
      totalRepayments += hasDebt ? repayment : repayment + remainingDebt;

      totalMortgageCost += hasDebt ? repayment : repayment + remainingDebt;

      remainingDebt = hasDebt ? remainingDebt : 0;

      // Recalculated monthly payment after repayment
      const newMonthlyPayment = hasDebt
        ? calculateMonthlyPayment(remainingDebt, interestRate, remainingTerm)
        : 0;

      monthlyPayment = newMonthlyPayment;

      countRepayments++;
    }

    const interestPaid = remainingDebt * monthlyInterestRate;
    const principalPaid = monthlyPayment - interestPaid;

    remainingDebt -= principalPaid;
    totalMortgageCost += remainingDebt < 0 ? monthlyPayment + remainingDebt : monthlyPayment;

    const monthlyPaymentReduction = hasRepayment ? previousMonthlyPayment - monthlyPayment : 0;
    const monthlyPaymentSavedInterest = hasRepayment ? previousMonthlyInterest - interestPaid : 0;
    const totalInterestSavedWithRepayment = hasRepayment
      ? Math.max(monthlyPaymentSavedInterest * remainingTerm, 0)
      : 0;

    const returnOnRepaymentPercentage = hasRepayment
      ? (((totalInterestSavedWithRepayment + repayment) * 100) / repayment - 100) /
        (remainingTerm / 12)
      : 0;

    totalMortgageMonths++;

    monthlyPayments.push({
      month: month + 1,
      year,
      monthlyPayment,
      interestPaid,
      principalPaid,
      remainingDebt: Math.max(remainingDebt, 0),
      monthlyPaymentReduction,
      monthlyPaymentSavedInterest,
      totalInterestSavedWithRepayment,
      returnOnRepaymentPercentage,
      lastRepaymentAmount,
      leftOverFromLastRepayment,
    });

    if (remainingDebt <= 0) {
      break;
    }

    if (month + 1 !== 1 && (month + 1) % 12 === 0) {
      year += 1;
    }
  }

  const totalSavedOnInterest = monthlyPayments.reduce(
    (prev, curr) => (prev += curr.totalInterestSavedWithRepayment),
    0,
  );

  return {
    totalMonths: totalMortgageMonths,
    totalCost: totalMortgageCost,
    totalDebt: amountInDebt,
    totalInterest: totalMortgageCost - amountInDebt,
    totalSavedOnInterest,
    estimatedRepayment: repayment,
    monthlyPayments,
    repaymentDetails: {
      count: countRepayments,
      amount: totalRepayments,
    },
  };
}

export function calculateMonthlyPayment(
  remainingDebt: number,
  interestRate: number,
  remainingTerm: number,
) {
  const monthlyInterestRate = interestRate / 100 / 12;

  const monthlyPayment =
    (remainingDebt * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -remainingTerm));

  return monthlyPayment;
}
