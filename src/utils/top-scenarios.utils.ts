import { CalculationResult } from './calculator.utils';

export function topScenarios(calculation?: CalculationResult): { best: string; worst: string } {
  if (calculation) {
    const { noAction, onlyRepayment, onlyInvesting, fiftyFifty } = calculation;

    const noActionCagr = noAction.overview.cagr;
    const onlyRepaymentCagr = onlyRepayment.overview.cagr;
    const onlyInvestingCagr = onlyInvesting.overview.cagr;
    const fiftyFiftyCagr = fiftyFifty.overview.cagr;

    const maxVal = Math.max(noActionCagr, onlyRepaymentCagr, onlyInvestingCagr, fiftyFiftyCagr);

    const minVal = Math.min(noActionCagr, onlyRepaymentCagr, onlyInvestingCagr, fiftyFiftyCagr);

    const options = { best: 'N/A', worst: 'N/A' };

    if (maxVal === noActionCagr) options.best = 'Mortgage Without Repayments';
    if (minVal === noActionCagr) options.worst = 'Mortgage Without Repayments';

    if (maxVal === onlyRepaymentCagr) options.best = 'Only Repayments';
    if (minVal === onlyRepaymentCagr) options.worst = 'Only Repayments';

    if (maxVal === onlyInvestingCagr) options.best = 'Only Invest';
    if (minVal === onlyInvestingCagr) options.worst = 'Only Invest';

    if (maxVal === fiftyFiftyCagr) options.best = 'Fifty Fifty';
    if (minVal === fiftyFiftyCagr) options.worst = 'Fifty Fifty';

    return options;
  }
  return { best: 'N/A', worst: 'N/A' };
}
