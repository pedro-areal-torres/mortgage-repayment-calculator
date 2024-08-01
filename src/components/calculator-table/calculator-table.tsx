import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import { CalculationResult } from '../../utils/calculator.utils';

import { topScenarios } from '../../utils/top-scenarios.utils';
import CalculatorTabs from '../calculator-tabs/calculator-tabs';
import CalculatorNoAction from '../calculator-results/calculator-no-action';
import CalculatorOnlyRepayment from '../calculator-results/calculator-only-repayment';
import { useState } from 'react';
import CalculatorOnlyInvest from '../calculator-results/calculator-only-invest';
import CalculatorFiftyFifty from '../calculator-results/calculator-fifty-fifty';

interface Props {
  calculation?: CalculationResult;
}

function CalculatorTable({ calculation }: Props) {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const topArr = topScenarios(calculation);

  console.log({ calculation });

  return (
    <>
      {calculation && (
        <>
          <div className="my-4 flex flex-col sm:flex-row gap-2">
            <div className="bg-green-400 rounded p-2 text-sm border-gray-500 border font-normal w-full">
              {t('Most beneficial')}: <span className="font-bold">{t(topArr[0])}</span>
            </div>
            <div className="bg-red-300 rounded p-2 text-sm border-gray-500 border font-normal w-full">
              {t('Least beneficial')}: <span className="font-bold">{t(topArr[1])}</span>
            </div>
          </div>
          <Separator />
          <div>
            <CalculatorTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <dl className="mt-5 grid grid-cols-1 gap-5">
              <CalculatorNoAction calculation={calculation.noAction} currentTab={currentTab} />
              <CalculatorOnlyRepayment calculation={calculation.onlyRepayment} currentTab={currentTab} />
              <CalculatorOnlyInvest calculation={calculation.onlyInvesting} currentTab={currentTab} />
              <CalculatorFiftyFifty calculation={calculation.fiftyFifty} currentTab={currentTab} />
            </dl>
          </div>
        </>
      )}
    </>
  );
}

export default CalculatorTable;
