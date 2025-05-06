import { ChartConfig } from '@components/ui/chart';
import { CalculationResult } from '@types';

interface ChartDataEntry {
  date: string;
  netWorth?: number;
  liquidity?: number;
  mortgageBalance?: number;
}

export function generateNetWorthChartData(calculation: CalculationResult, currentTab: number): ChartDataEntry[] {
  const currentYear = new Date().getFullYear();

  const scenarioMap = ['noAction', 'onlyRepayment', 'onlyInvesting', 'fiftyFifty'] as const;

  const activeScenario = scenarioMap[currentTab];
  const selected = calculation[activeScenario];

  const yearsLeftMortgage = selected.mortgageDetails.totalMonths / 12;

  const chartData: ChartDataEntry[] = [];

  for (let i = 0; i <= yearsLeftMortgage; i++) {
    const year = currentYear + i;

    const progress = i / yearsLeftMortgage;

    let netWorth = 0;
    switch (activeScenario) {
      case 'noAction':
        netWorth = selected.overview.net * progress; // linear
        break;
      case 'onlyRepayment':
        netWorth = selected.overview.net * (progress < 0.33 ? progress * 1.5 : 0.5 + (progress - 0.33) * 0.75);
        break;
      case 'onlyInvesting':
        netWorth = selected.overview.net * Math.pow(progress, 2); // exponential
        break;
      case 'fiftyFifty':
        const netRepay = calculation.onlyRepayment.overview.net;
        const netInvest = calculation.onlyInvesting.overview.net;
        const avg =
          (netRepay * (progress < 0.33 ? progress * 1.5 : 0.5 + (progress - 0.33) * 0.75) + netInvest * Math.pow(progress, 2)) / 2;
        netWorth = avg;
        break;
    }

    // Liquidity (cash or savings or invested capital)
    let liquidity = 0;
    if (activeScenario === 'noAction') {
      liquidity = selected.assetsDetails.savings * progress;
    } else if (activeScenario === 'onlyInvesting') {
      liquidity = selected.investmentDetails.invested * progress + selected.investmentDetails.profit * Math.pow(progress, 2);
    } else if (activeScenario === 'fiftyFifty') {
      const repayPortion = (calculation.onlyRepayment.assetsDetails.savings || 0) * progress;
      const investPortion =
        (calculation.onlyInvesting.investmentDetails.invested * progress +
          calculation.onlyInvesting.investmentDetails.profit * Math.pow(progress, 2)) /
        2;
      liquidity = repayPortion + investPortion;
    } else {
      liquidity = 0; // Repayment has close to 0 liquidity
    }

    // Mortgage Balance
    const monthly = selected.mortgageDetails.monthlyPayments;
    const yearIndex = i * 12;
    const monthData = monthly[Math.min(yearIndex, monthly.length - 1)];
    const mortgageBalance = monthData?.remainingDebt || 0;

    chartData.push({
      date: year.toString(),
      netWorth: parseFloat(netWorth.toFixed(2)),
      liquidity: parseFloat(liquidity.toFixed(2)),
      mortgageBalance: parseFloat(mortgageBalance.toFixed(2)),
    });
  }

  return chartData;
}

export const chartConfig = {
  netWorth: {
    label: 'netWorth',
    color: '#1f77b4',
  },
  liquidity: {
    label: 'liquidity',
    color: '#2ca02c',
  },
  mortgageBalance: {
    label: 'mortgageBalance',
    color: '#DC143C',
  },
} as ChartConfig;
