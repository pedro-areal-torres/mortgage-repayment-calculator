import { CalculationResult } from './calculator.utils';

export function topScenarios(calculation?: CalculationResult) {
  if (calculation) {
    const assetsNoAction =
      (calculation.noAction.totalAssets + calculation.noAction.totalSaved) /
      calculation.noAction.totalCost;
    const assetsOnlyInvest =
      (calculation.onlyInvesting.totalAssets +
        calculation.onlyInvesting.investmentDetails.totalEarnedOnSP) /
      (calculation.onlyInvesting.totalCost + calculation.noAction.totalSaved);
    const assetsOnlyRepayment =
      (calculation.onlyRepayment.totalAssets +
        calculation.onlyRepayment.totalSaved) /
      calculation.onlyRepayment.totalCost;
    const assetsFiftyFifty = 0;

    const maxVal = Math.max(
      assetsNoAction,
      assetsOnlyInvest,
      assetsOnlyRepayment,
      assetsFiftyFifty
    );

    const minVal = Math.min(
      assetsNoAction,
      assetsOnlyInvest,
      assetsOnlyRepayment
    );

    const options = [];

    if (maxVal === assetsNoAction || minVal === assetsNoAction)
      options.push('Mortgage Without Repayments');
    if (maxVal === assetsOnlyInvest || minVal === assetsOnlyInvest)
      options.push('Only Invest');
    if (maxVal === assetsOnlyRepayment || minVal === assetsOnlyRepayment)
      options.push('Only Repayments');
    if (maxVal === assetsOnlyRepayment || minVal === assetsOnlyRepayment)
      options.push('Fifty Fifty');

    return options;
  }
  return [];
}
