import { CalculationResult } from '@types';

type NetValueResult = {
  net: number;
  best: boolean;
  worst: boolean;
};

export function getScenariosnNetValues(
  calculation?: CalculationResult,
): Record<string, NetValueResult> {
  if (!calculation) throw new Error('No calculation avaialble to getScenariosnNetValues');

  const scenarioNetValues: Record<string, number> = {
    noAction: calculation.noAction.overview.net,
    onlyRepayment: calculation.onlyRepayment.overview.net,
    onlyInvesting: calculation.onlyInvesting.overview.net,
    fiftyFifty: calculation.fiftyFifty.overview.net,
  };

  const entries = Object.entries(scenarioNetValues);

  const bestEntry = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const worstEntry = entries.reduce((a, b) => (b[1] < a[1] ? b : a));

  const result: Record<string, { net: number; best: boolean; worst: boolean }> = {};

  for (const [key, net] of entries) {
    result[key] = {
      net,
      best: key === bestEntry[0],
      worst: key === worstEntry[0],
    };
  }

  return result;
}
