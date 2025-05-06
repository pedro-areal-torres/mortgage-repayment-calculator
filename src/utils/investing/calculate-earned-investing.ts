// Calculate total savings from investing with compounding interest
export function calculateEarnedInvesting(
  totalMonths: number,
  frequency: number,
  expectedRepayment: number,
  spAverageReturn: number,
): number {
  let totalSavedInvesting = 0;

  for (let i = 12; i <= totalMonths; i += 12) {
    const yearlyProfit =
      totalSavedInvesting === 0 ? expectedRepayment : totalSavedInvesting * (spAverageReturn / 100);
    const addRepayment = totalSavedInvesting !== 0 && i % frequency === 0 ? expectedRepayment : 0;
    totalSavedInvesting += yearlyProfit + addRepayment;
  }

  return totalSavedInvesting;
}
