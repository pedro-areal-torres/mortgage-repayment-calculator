import { CalculationResult } from './calculator.utils';

export function topScenarios(calculation?: CalculationResult) {
  if (calculation) {
    // NO ACTION
    const totalAssetNoAction = calculation.noAction.totalAssets + calculation.noAction.totalSaved;

    // ONLY INVEST
    const totalAssetOnlyInvest =
      calculation.onlyInvesting.totalAssets +
      calculation.onlyInvesting.investmentDetails.totalEarned;

    // ONLY REPAYMENT
    const totalAssetOnlyRepayment =
      calculation.onlyRepayment.totalAssets + calculation.onlyRepayment.totalSaved;

    // 50 / 50
    const totalAssetFiftyFifty =
      calculation.fiftyFifty.totalAssets +
      calculation.fiftyFifty.investmentDetails.totalEarned +
      calculation.fiftyFifty.totalSaved;

    const maxVal = Math.max(
      totalAssetNoAction,
      totalAssetOnlyInvest,
      totalAssetOnlyRepayment,
      totalAssetFiftyFifty
    );

    const minVal = Math.min(
      totalAssetNoAction,
      totalAssetOnlyInvest,
      totalAssetOnlyRepayment,
      totalAssetFiftyFifty
    );

    const options = [];

    if (maxVal === totalAssetNoAction || minVal === totalAssetNoAction)
      options.push('Mortgage Without Repayments');
    if (maxVal === totalAssetOnlyInvest || minVal === totalAssetOnlyInvest)
      options.push('Only Invest');
    if (maxVal === totalAssetOnlyRepayment || minVal === totalAssetOnlyRepayment)
      options.push('Only Repayments');
    if (maxVal === totalAssetFiftyFifty || minVal === totalAssetFiftyFifty)
      options.push('Fifty Fifty');

    return options;
  }
  return [];
}
