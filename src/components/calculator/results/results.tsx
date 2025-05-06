import { Card, CardContent } from '@components/ui/card';
import ChartResult from '@components/chart/chart-result';

import NoActionResult from './scenarios/no-action';
import OnlyRepaymentResult from './scenarios/only-repayment';
import OnlyInvestResult from './scenarios/only-invest';
import FiftyFiftyResult from './scenarios/fifty-fifty';
import CalculatorTabs from '../tabs/calculator-tabs';

function CalculatorResults() {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <ChartResult />
      <Card>
        <CardContent className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
          <div className='w-full'>
            <CalculatorTabs />
            <dl className='grid grid-cols-1 gap-5'>
              <NoActionResult />
              <OnlyRepaymentResult />
              <OnlyInvestResult />
              <FiftyFiftyResult />
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CalculatorResults;
