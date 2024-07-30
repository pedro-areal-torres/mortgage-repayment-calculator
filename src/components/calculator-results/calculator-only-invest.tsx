import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { CalculationResult } from '../../utils/calculator.utils';
import { cn } from '../../lib/utils';
import { formatNumber } from '../../utils/format-number.utils';
import CalculatorInfoPreviousCosts from '../calculator-info/calculator-info-previous-costs';

interface Props {
  calculation: CalculationResult;
  currentTab: number;
}

export default function CalculatorOnlyInvest({
  calculation,
  currentTab,
}: Props) {
  const { t } = useTranslation();

  const totalAssetOnlyInvest =
    calculation.onlyInvesting.totalAssets +
    calculation.onlyInvesting.investmentDetails.totalEarnedOnSP;
  const totalCostsOnlyInvest =
    calculation.onlyInvesting.totalCost + calculation.noAction.totalSaved;

  const returnOnlyInvest = totalAssetOnlyInvest / totalCostsOnlyInvest;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4',
        currentTab !== 2 && 'hidden'
      )}
    >
      <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
        <div className="text-md font-semibold mt-1">{t('Resume')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">
            {t('Total Assets by end')}
            {calculation.noAction.totalMonths} {t('Months')}:{' '}
          </span>
          {formatNumber(
            calculation.onlyInvesting.totalAssets +
              calculation.onlyInvesting.investmentDetails.totalEarnedOnSP
          )}
          €
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('From today out pocket')}: </span>
          {formatNumber(
            calculation.onlyInvesting.totalCost +
              calculation.noAction.totalSaved
          )}
          €
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('ROIC')}: </span>
          {formatNumber(returnOnlyInvest)}%
        </div>
        <CalculatorInfoPreviousCosts />

        <Separator className="my-4" />
        <div className="text-md font-semibold">{t('Cost details')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('Mortgage Cost')}: </span>
          {formatNumber(calculation.onlyInvesting.totalCost)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Interest Cost')}: </span>
          {formatNumber(calculation.onlyInvesting.totalInterest)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Amount Invested')}: </span>
          {formatNumber(calculation.noAction.totalSaved)}€
        </div>

        <Separator className="my-4" />
        <div className="text-md font-semibold">{t('Assets details')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('House')}: </span>
          {formatNumber(calculation.onlyInvesting.totalAssets)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('SP Profit')}: </span>
          {formatNumber(
            calculation.onlyInvesting.investmentDetails.totalProfitSP
          )}
          €
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Invested with profit')}: </span>
          {formatNumber(
            calculation.onlyInvesting.investmentDetails.totalEarnedOnSP
          )}
          €
        </div>
        <div className="flex flex-row gap-1 items-center mt-2">
          <svg
            fill="currentColor"
            color="gray"
            viewBox="0 0 16 16"
            height=".8rem"
            width=".8rem"
          >
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          <p className="text-xs leading-6 text-slate-500">
            {t('House Inflation')}
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-semibold">
              {t('Payment details')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                      <table className="min-w-full divide-y divide-gray-300 text-center">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              {t('Month')}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-semibold text-gray-900"
                            >
                              {t('Monthly Payment')}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-semibold text-gray-900"
                            >
                              {t('Interest Paid')}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-semibold text-gray-900"
                            >
                              {t('Principal Paid')}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-semibold text-gray-900"
                            >
                              {t('Remaining Debt')}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {calculation.noAction.paymentDetails.map((detail) => (
                            <tr key={detail.month}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {detail.month}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatNumber(detail.monthlyPayment)}€
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatNumber(detail.interestPaid)}€
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatNumber(detail.principalPaid)}€
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatNumber(detail.remainingDebt)}€
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </dd>
    </div>
  );
}
