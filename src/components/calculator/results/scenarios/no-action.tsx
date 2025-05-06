import { useTranslation } from 'react-i18next';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { calculateEndMortgageDate } from '@utils/mortgage/calculate-end-mortgage-date';
import { MortgageCalculationResult } from 'types';
import PreviousCostsInfo from '@components/info-section/previous-costs-info';
import InflationInfo from '@components/info-section/inflation-info';
import { ResultResume } from './common/result-resume';
import { ResultCostDetails } from './common/result-cost-details';
import { ResultAssetDetails } from './common/result-asset-details';
import { DetailsSheet } from '@components/calculator/details-sheet/details-sheet';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@components/ui/button';

interface Props {
  calculation: MortgageCalculationResult;
  currentTab: number;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function NoActionResult({ calculation, currentTab, setShowForm }: Props) {
  const { t } = useTranslation();

  const { overview, assetsDetails, mortgageDetails } = calculation;

  if (currentTab !== 0) return null;

  return (
    <div className={cn('overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4')}>
      <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
        <div className="text-md font-semibold">{t('Resume')}</div>
        <ResultResume totalAssets={overview.earned} outOfPocket={overview.costs} netResult={overview.net} />
        <div className="text-sm">
          <span className="text-gray-500">{t('Total Term')}: </span>
          {calculateEndMortgageDate(mortgageDetails.totalMonths)} ({mortgageDetails.totalMonths} {t('Months')})
        </div>
        <PreviousCostsInfo />

        <Separator className="my-4" />

        <div className="flex flex-row w-full justify-between items-center">
          <DetailsSheet rows={mortgageDetails.monthlyPayments}>
            <>
              <ResultCostDetails totalDebt={mortgageDetails.totalDebt} totalInterest={mortgageDetails.totalInterest} />

              <Separator className="my-4" />

              <ResultAssetDetails houseValue={assetsDetails.houseValue} savings={assetsDetails.savings} />

              <InflationInfo />
            </>
          </DetailsSheet>

          <Button variant={'outline'} onClick={() => setShowForm(true)}>
            {t('Back')}
          </Button>
        </div>
      </dd>
    </div>
  );
}
