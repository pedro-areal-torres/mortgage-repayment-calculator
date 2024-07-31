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
import CalculatorInfoHouseInflation from '../calculator-info/calculator-info-house-inflation';

interface Props {
  calculation: CalculationResult;
  currentTab: number;
}

export default function CalculatorNoAction({ calculation, currentTab }: Props) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4',
        currentTab !== 0 && 'hidden'
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
            calculation.noAction.totalAssets + calculation.noAction.totalSaved
          )}
          €
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('From today out pocket')}: </span>
          {formatNumber(calculation.noAction.totalCost)}€
        </div>
        <CalculatorInfoPreviousCosts />

        <Separator className="my-4" />
        <div className="text-md font-semibold">{t('Cost details')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('Mortgage Cost')}: </span>
          {formatNumber(calculation.noAction.totalCost)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Interest Cost')}: </span>
          {formatNumber(calculation.noAction.totalInterest)}€
        </div>

        <Separator className="my-4" />
        <div className="text-md font-semibold">{t('Assets details')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('House')}: </span>
          {formatNumber(calculation.noAction.totalAssets)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Savings')}: </span>
          {formatNumber(calculation.noAction.totalSaved)}€
        </div>
        <CalculatorInfoHouseInflation />

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
