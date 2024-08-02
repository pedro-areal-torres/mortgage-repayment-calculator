import { CalculationResult } from './calculator.utils';

export function topScenarios(calculation?: CalculationResult): { best: string; worst: string } {
  if (calculation) {
    const { noAction, onlyRepayment, onlyInvesting, fiftyFifty } = calculation;

    const totalAssetNoAction = noAction.overview.net;
    const totalAssetOnlyRepayment = onlyRepayment.overview.net;
    const totalAssetOnlyInvest = onlyInvesting.overview.net;
    const totalAssetFiftyFifty = fiftyFifty.overview.net;

    const maxVal = Math.max(totalAssetNoAction, totalAssetOnlyInvest, totalAssetOnlyRepayment, totalAssetFiftyFifty);

    const minVal = Math.min(totalAssetNoAction, totalAssetOnlyInvest, totalAssetOnlyRepayment, totalAssetFiftyFifty);

    const options = { best: 'N/A', worst: 'N/A' };

    if (maxVal === totalAssetNoAction) options.best = 'Mortgage Without Repayments';
    if (minVal === totalAssetNoAction) options.worst = 'Mortgage Without Repayments';

    if (maxVal === totalAssetOnlyRepayment) options.best = 'Only Repayments';
    if (minVal === totalAssetOnlyRepayment) options.worst = 'Only Repayments';

    if (maxVal === totalAssetOnlyInvest) options.best = 'Only Invest';
    if (minVal === totalAssetOnlyInvest) options.worst = 'Only Invest';

    if (maxVal === totalAssetFiftyFifty) options.best = 'Fifty Fifty';
    if (minVal === totalAssetFiftyFifty) options.worst = 'Fifty Fifty';

    return options;
  }
  return { best: 'N/A', worst: 'N/A' };
}
