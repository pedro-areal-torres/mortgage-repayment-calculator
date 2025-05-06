import { useTranslation } from 'react-i18next';

import { useCalculator } from '@context/useCalculator';

import { Separator } from '@components/ui/separator';
import { cn } from '@lib/tw-merge';
import { calculateEndMortgageDate } from '@utils/mortgage/calculate-end-mortgage-date';
import PreviousCostsInfo from '@components/info-section/previous-costs-info';
import { DetailsSheet } from '@components/calculator/details-sheet/details-sheet';
import ButtonBack from '@components/calculator/button/button-back';
import { formatNumber } from '@utils/format-number';

import { ResultResume } from './common/result-resume';
import { ResultCostDetails } from './common/result-cost-details';
import { ResultAssetDetails } from './common/result-asset-details';

export default function OnlyInvestResult() {
  const { t } = useTranslation();
  const { calculation, currentTab } = useCalculator();

  const { overview, assetsDetails, mortgageDetails, investmentDetails } =
    calculation?.onlyInvesting!;

  if (currentTab !== 2) return null;

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
        <div className='text-sm'>
          <span className='text-gray-500'>{t('Amount Invested')}: </span>
          {formatNumber(investmentDetails.invested)}€
        </div>

        <PreviousCostsInfo />

        <Separator className='my-4' />

        <div className='flex flex-row w-full justify-between items-center'>
          <DetailsSheet rows={mortgageDetails.monthlyPayments}>
            <ResultCostDetails
              totalDebt={mortgageDetails.totalDebt}
              totalInterest={mortgageDetails.totalInterest}
              taxAmount={investmentDetails.profit * 0.28}
            />

            <Separator className='my-4' />

            <ResultAssetDetails
              houseValue={assetsDetails.houseValue}
              savings={assetsDetails.savings}
              profit={investmentDetails.profit}
            />

            <div className='flex flex-row gap-1 items-center mt-2'>
              <svg
                fill='currentColor'
                color='gray'
                viewBox='0 0 16 16'
                height='.8rem'
                width='.8rem'
              >
                <path d='M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z' />
              </svg>
              <p className='text-xs leading-6 text-slate-500'>{t('House Inflation')}</p>
            </div>
          </DetailsSheet>

          <ButtonBack />
        </div>
      </dd>
    </div>
  );
}
