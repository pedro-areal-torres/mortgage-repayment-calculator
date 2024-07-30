import { CalculationResult } from './calculator.utils';

export function topScenarios(calculation?: CalculationResult) {
  if (calculation) {
    // NO ACTION
    const totalAssetNoAction =
      calculation.noAction.totalAssets + calculation.noAction.totalSaved;
    const returnNoAction = totalAssetNoAction / calculation.noAction.totalCost;

    // ONLY INVEST
    const totalAssetOnlyInvest =
      calculation.onlyInvesting.totalAssets +
      calculation.onlyInvesting.investmentDetails.totalEarnedOnSP;
    const totalCostsOnlyInvest =
      calculation.onlyInvesting.totalCost + calculation.noAction.totalSaved;

    const returnOnlyInvest = totalAssetOnlyInvest / totalCostsOnlyInvest;

    // ONLY REPAYMENT
    const totalAssetOnlyRepayment =
      calculation.onlyRepayment.totalAssets +
      calculation.onlyRepayment.totalSaved;

    const returnOnlyRepayment =
      totalAssetOnlyRepayment / calculation.onlyRepayment.totalCost;

    // 50 / 50
    const totalAssetFiftyFifty =
      calculation.fiftyFifty.totalAssets +
      calculation.fiftyFifty.investmentDetails.totalEarnedOnSP +
      calculation.fiftyFifty.totalSaved;

    const totalCostsFiftyFifty =
      calculation.onlyInvesting.totalCost + calculation.noAction.totalSaved;

    const returnFiftyFifty = totalAssetFiftyFifty / totalCostsFiftyFifty;

    const maxVal = Math.max(
      returnNoAction,
      returnOnlyInvest,
      returnOnlyRepayment,
      returnFiftyFifty
    );

    const minVal = Math.min(
      returnNoAction,
      returnOnlyInvest,
      returnOnlyRepayment,
      returnFiftyFifty
    );

    const options = [];

    if (maxVal === returnNoAction || minVal === returnNoAction)
      options.push('Mortgage Without Repayments');
    if (maxVal === returnOnlyInvest || minVal === returnOnlyInvest)
      options.push('Only Invest');
    if (maxVal === returnOnlyRepayment || minVal === returnOnlyRepayment)
      options.push('Only Repayments');
    if (maxVal === returnFiftyFifty || minVal === returnFiftyFifty)
      options.push('Fifty Fifty');

    return options;
  }
  return [];
}
