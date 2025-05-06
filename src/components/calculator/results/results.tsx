import CalculatorTabs from '../tabs/calculator-tabs';
import { Dispatch, SetStateAction, useState } from 'react';
import { CalculationResult } from '@types';
import NoActionResult from './scenarios/no-action';
import OnlyRepaymentResult from './scenarios/only-repayment';
import OnlyInvestResult from './scenarios/only-invest';
import FiftyFiftyResult from './scenarios/fifty-fifty';

import { Card, CardContent } from '@components/ui/card';
import ChartResult from '@components/chart/chart-result';

interface Props {
  calculation: CalculationResult;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

function CalculatorResults({ calculation, setShowForm }: Props) {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="flex flex-col gap-6 w-full">
      <ChartResult calculation={calculation} currentTab={currentTab} />
      <Card>
        <CardContent className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="w-full">
            <CalculatorTabs currentTab={currentTab} setCurrentTab={setCurrentTab} calculation={calculation} />
            <dl className="grid grid-cols-1 gap-5">
              <NoActionResult calculation={calculation.noAction} currentTab={currentTab} setShowForm={setShowForm} />
              <OnlyRepaymentResult
                calculation={calculation.onlyRepayment}
                currentTab={currentTab}
                initialTotalMonths={calculation.noAction.mortgageDetails.totalMonths}
                setShowForm={setShowForm}
              />
              <OnlyInvestResult calculation={calculation.onlyInvesting} currentTab={currentTab} setShowForm={setShowForm} />
              <FiftyFiftyResult
                calculation={calculation.fiftyFifty}
                currentTab={currentTab}
                initialTotalMonths={calculation.noAction.mortgageDetails.totalMonths}
                setShowForm={setShowForm}
              />
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CalculatorResults;
