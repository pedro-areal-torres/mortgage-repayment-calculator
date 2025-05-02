import { useTranslation } from 'react-i18next';
import { Separator } from '@components/ui/separator';
import { CalculationResult } from '@utils/calculator.utils';

import { topScenarios } from '@utils/top-scenarios.utils';
import CalculatorTabs from '../tabs/calculator-tabs';
import NoActionResult from '../results/no-action';
import OnlyRepaymentResult from '../results/only-repayment';
import { useState } from 'react';
import OnlyInvestResult from '../results/only-invest';
import FiftyFiftyResult from '../results/fifty-fifty';

interface Props {
  calculation?: CalculationResult;
}

function CalculatorResultsTable({ calculation }: Props) {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { best, worst } = topScenarios(calculation);

  return (
    <>
      {calculation && (
        <>
          <div className="my-4 flex flex-col sm:flex-row gap-2">
            <div className="bg-green-400 rounded p-2 text-sm border-gray-500 border font-normal w-full">
              {t('Most beneficial')}: <span className="font-bold">{t(best)}</span>
            </div>
            <div className="bg-red-300 rounded p-2 text-sm border-gray-500 border font-normal w-full">
              {t('Least beneficial')}: <span className="font-bold">{t(worst)}</span>
            </div>
          </div>
          <Separator />
          <div>
            <CalculatorTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <dl className="mt-5 grid grid-cols-1 gap-5">
              <NoActionResult calculation={calculation.noAction} currentTab={currentTab} />
              <OnlyRepaymentResult
                calculation={calculation.onlyRepayment}
                currentTab={currentTab}
                initialTotalMonths={calculation.noAction.mortgageDetails.totalMonths}
              />
              <OnlyInvestResult calculation={calculation.onlyInvesting} currentTab={currentTab} />
              <FiftyFiftyResult
                calculation={calculation.fiftyFifty}
                currentTab={currentTab}
                initialTotalMonths={calculation.noAction.mortgageDetails.totalMonths}
              />
            </dl>
          </div>
        </>
      )}
    </>
  );
}

export default CalculatorResultsTable;
