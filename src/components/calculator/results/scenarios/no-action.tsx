import { useTranslation } from 'react-i18next';

import { useCalculator } from '@context/useCalculator';

import { cn } from '@lib/tw-merge';
import { Separator } from '@components/ui/separator';
import PreviousCostsInfo from '@components/info-section/previous-costs-info';
import InflationInfo from '@components/info-section/inflation-info';
import ButtonBack from '@components/calculator/button/button-back';
import { DetailsSheet } from '@components/calculator/details-sheet/details-sheet';
import { calculateEndMortgageDate } from '@utils/mortgage/calculate-end-mortgage-date';

import { ResultResume } from './common/result-resume';
import { ResultCostDetails } from './common/result-cost-details';
import { ResultAssetDetails } from './common/result-asset-details';

export default function NoActionResult() {
  const { t } = useTranslation();
  const { calculation, currentTab } = useCalculator();

  const { overview, assetsDetails, mortgageDetails } = calculation?.noAction!;

  if (currentTab !== 0) return null;

  return (
    <div className={cn('overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4')}>
      <dd className='mt-1 text-md font-normal tracking-tight text-gray-900'>
        <div className='text-md font-semibold'>{t('Resume')}</div>
        <ResultResume
          totalAssets={overview.earned}
          outOfPocket={overview.costs}
          netResult={overview.net}
        />
        <div className='text-sm'>
          <span className='text-gray-500'>{t('Total Term')}: </span>
          {calculateEndMortgageDate(mortgageDetails.totalMonths)} ({mortgageDetails.totalMonths}{' '}
          {t('Months')})
        </div>
        <PreviousCostsInfo />

        <Separator className='my-4' />

        <div className='flex flex-row w-full justify-between items-center'>
          <DetailsSheet rows={mortgageDetails.monthlyPayments}>
            <>
              <ResultCostDetails
                totalDebt={mortgageDetails.totalDebt}
                totalInterest={mortgageDetails.totalInterest}
              />

              <Separator className='my-4' />

              <ResultAssetDetails
                houseValue={assetsDetails.houseValue}
                savings={assetsDetails.savings}
              />

              <InflationInfo />
            </>
          </DetailsSheet>

          <ButtonBack />
        </div>
      </dd>
    </div>
  );
}
