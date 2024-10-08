import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '../../lib/utils';
import { formatNumber } from '../../utils/format-number.utils';
import CalculatorInfoPreviousCosts from '../calculator-info/calculator-info-previous-costs';
import { MortgageCalculationResult } from '../../utils/calculator.utils';
import CalculatorInfoHouseInflation from '../calculator-info/calculator-info-house-inflation';
import { calculateEndMortgageDate } from '../../utils/calculate-end-mortgage-date';

interface Props {
  calculation: MortgageCalculationResult;
  currentTab: number;
  initialTotalMonths: number;
}

export default function CalculatorFiftyFifty({ calculation, currentTab, initialTotalMonths }: Props) {
  const { t } = useTranslation();

  const { overview, assetsDetails, mortgageDetails, investmentDetails } = calculation;

  const termReduction = initialTotalMonths - mortgageDetails.totalMonths;

  return (
    <div className={cn('overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4', currentTab !== 3 && 'hidden')}>
      <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
        <div className="text-md font-semibold mt-1">{t('Resume')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('Total Term')}: </span>
          {calculateEndMortgageDate(mortgageDetails.totalMonths)} ({mortgageDetails.totalMonths} {t('Months')})
        </div>
        <div className="text-sm">
          {termReduction === 0 ? (
            <span className="text-gray-500">{t('Despite reduction')}</span>
          ) : (
            <>
              <span className="text-gray-500">{t('Term reduction')}: </span>
              {termReduction} {termReduction > 1 ? t('Months') : t('MonthL')}
            </>
          )}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Repayment done')}: </span>
          {formatNumber(mortgageDetails.repaymentDetails.amount)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Amount Invested')}: </span>
          {formatNumber(investmentDetails.invested)}€
        </div>

        <div className="text-sm mt-1.5">
          <span className="text-gray-500">{t('Total Assets by end')}: </span>
          {formatNumber(overview.earned)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('From today out pocket')}: </span>
          {formatNumber(overview.costs)}€
        </div>

        <div className="text-sm">
          <span className="text-gray-500">{t('Result')}: </span>
          <span className="text-green-600 font-bold">{formatNumber(overview.net)}€</span>
        </div>
        <CalculatorInfoPreviousCosts />

        <Separator className="my-4" />
        <div className="text-md font-semibold">{t('Cost details')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('Mortgage Cost')}: </span>
          {formatNumber(mortgageDetails.totalDebt)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Interest Cost')}: </span>
          {formatNumber(mortgageDetails.totalInterest)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Includes tax')}: </span>
          {formatNumber(investmentDetails.profit * 0.28)}€
        </div>

        <Separator className="my-4" />
        <div className="text-md font-semibold">{t('Assets details')}</div>
        <div className="text-sm mt-1">
          <span className="text-gray-500">{t('House')}: </span>
          {formatNumber(assetsDetails.houseValue)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('SP Profit')}: </span>
          {formatNumber(investmentDetails.profit)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Interest Saved')}: </span>
          {formatNumber(mortgageDetails.totalSavedOnInterest)}€
        </div>
        <div className="text-sm">
          <span className="text-gray-500">{t('Savings')}: </span>
          {formatNumber(assetsDetails.savings)}€ {assetsDetails.savings > 0 && `(${t('Spare money')})`}
        </div>
        <CalculatorInfoHouseInflation />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md font-semibold">{t('Payment details')}</AccordionTrigger>
            <AccordionContent>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                      <table className="min-w-full divide-y divide-gray-300 text-center">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                              {t('Month')}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                              {t('Monthly Payment')}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                              {t('Interest Paid')}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                              {t('Principal Paid')}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                              {t('Remaining Debt')}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                              {t('Monthly reduction')}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                              {t('Monthly reduction return')}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {mortgageDetails.monthlyPayments.map((detail) => (
                            <tr key={detail.month}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{detail.month}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatNumber(detail.monthlyPayment)}€</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatNumber(detail.interestPaid)}€</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatNumber(detail.principalPaid)}€</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatNumber(detail.remainingDebt > 0 ? detail.remainingDebt : 0)}€</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {detail.lastRepaymentAmount === 0 ? detail.monthlyPaymentReduction
                                  ? `${formatNumber(detail.monthlyPaymentReduction)}€ (${t('Which')} ${formatNumber(detail.monthlyPaymentSavedInterest)}€ ${t('Are Interest')})`
                                  : '-' : `${t('Last Repayment')} ${formatNumber((detail.lastRepaymentAmount - mortgageDetails.estimatedRepayment!) * (-1))}`}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {detail.monthlyPaymentReduction ? `${formatNumber(detail.totalInterestSavedWithRepayment)}€` : '-'}
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
