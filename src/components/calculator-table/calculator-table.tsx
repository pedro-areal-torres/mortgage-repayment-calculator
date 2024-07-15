import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import { CalculationResult } from '../../utils/calculator.utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';

interface Props {
  calculation?: CalculationResult;
}

function CalculatorTable({ calculation }: Props) {
  const { t } = useTranslation();
  /* const tabs = [
    'Mortgage Without Repayments',
    'Only Repayments',
    'Only Invest',
    'Both',
  ]; */

  const mostBenefitialScenario = () => {
    if (calculation) {
      const assetsNoAction =
        (calculation.noAction.totalAssets + calculation.noAction.totalSaved) /
        calculation.noAction.totalCost;
      const assetsOnlyInvest =
        (calculation.onlyInvesting.totalAssets +
          calculation.onlyInvesting.investmentDetails.totalEarnedOnSP) /
        (calculation.onlyInvesting.totalCost + calculation.noAction.totalSaved);
      const assetsOnlyRepayment =
        (calculation.onlyRepayment.totalAssets +
          calculation.onlyRepayment.totalSaved) /
        calculation.onlyRepayment.totalCost;

      const maxVal = Math.max(
        assetsNoAction,
        assetsOnlyInvest,
        assetsOnlyRepayment
      );

      const minVal = Math.min(
        assetsNoAction,
        assetsOnlyInvest,
        assetsOnlyRepayment
      );

      const options = [];

      if (maxVal === assetsNoAction || minVal === assetsNoAction)
        options.push('Mortgage Without Repayments');
      if (maxVal === assetsOnlyInvest || minVal === assetsOnlyInvest)
        options.push('Only Invest');
      if (maxVal === assetsOnlyRepayment || minVal === assetsOnlyRepayment)
        options.push('Only Repayments');

      return options;
    }
    return [];
  };

  console.log({ calculation });

  return (
    <>
      {calculation && (
        <>
          <Separator className="mt-4" />
          <div className="bg-green-400 rounded p-2 text-sm border-gray-500 border font-normal">
            {t('Most beneficial')}:{' '}
            <span className="font-bold">{t(mostBenefitialScenario()[0])}</span>
          </div>
          <div className="bg-red-300 rounded p-2 text-sm border-gray-500 border font-normal mt-4">
            {t('Least beneficial')}:{' '}
            <span className="font-bold">{t(mostBenefitialScenario()[1])}</span>
          </div>
          <Separator className="mt-4" />
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4">
                <dt className="truncate text-md font-bold">
                  {t('Mortgage Without Repayments')}
                </dt>
                <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
                  <div className="text-sm font-semibold mt-1">
                    {t('Resume')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">
                      {t('Total Assets by end')}
                      {calculation.noAction.totalMonths} {t('Months')}:{' '}
                    </span>
                    {calculation.noAction.totalAssets +
                      calculation.noAction.totalSaved}
                    €
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('From today out pocket')}:{' '}
                    </span>
                    {calculation.noAction.totalCost}€
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
                      {t('Past not included')}
                    </p>
                  </div>

                  <Separator className="my-4" />
                  <div className="text-sm font-semibold">
                    {t('Cost details')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">
                      {t('Mortgage Cost')}:{' '}
                    </span>
                    {calculation.noAction.totalCost}€
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Interest Cost')}:{' '}
                    </span>
                    {calculation.noAction.totalInterest}€
                  </div>

                  <Separator className="my-4" />
                  <div className="text-sm font-semibold">
                    {t('Assets details')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">{t('House')}: </span>
                    {calculation.noAction.totalAssets}€
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">{t('Savings')}: </span>
                    {calculation.noAction.totalSaved}€
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
                      <AccordionTrigger>
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
                                    {calculation.noAction.paymentDetails.map(
                                      (detail) => (
                                        <tr key={detail.month}>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {detail.month}
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.monthlyPayment}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.interestPaid}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.principalPaid}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.remainingDebt}€
                                          </td>
                                        </tr>
                                      )
                                    )}
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
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4">
                <dt className="truncate text-md font-bold">
                  {t('Only Repayments')}
                </dt>
                <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
                  <div className="text-sm font-semibold mt-1">
                    {t('Resume')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">
                      {t('Total Assets by end')}
                      {calculation.noAction.totalMonths} {t('Months')}:{' '}
                    </span>
                    {parseFloat(
                      (
                        calculation.onlyRepayment.totalAssets +
                        calculation.onlyRepayment.totalSaved
                      ).toFixed(2)
                    )}
                    €
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('From today out pocket')}:{' '}
                    </span>
                    {calculation.onlyRepayment.totalCost}€
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
                      {t('Past not included')}
                    </p>
                  </div>

                  <Separator className="my-4" />
                  <div className="text-sm font-semibold">
                    {t('Cost details')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">
                      {t('Mortgage Cost')}:{' '}
                    </span>
                    {calculation.onlyRepayment.totalCost}€
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Interest Saved')}:{' '}
                    </span>
                    {parseFloat(
                      (
                        calculation.noAction.totalCost -
                        calculation.onlyRepayment.totalCost
                      ).toFixed(2)
                    )}
                    €
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Repayment done')}:{' '}
                    </span>
                    {
                      calculation.onlyRepayment.repaymentDetails
                        .repaymentsAmount
                    }
                    €
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Term reduction')}:{' '}
                    </span>
                    {calculation.noAction.totalMonths -
                      calculation.onlyRepayment.totalMonths}{' '}
                    {t('Months')}
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
                      {t('Repayment penalty')}
                    </p>
                  </div>

                  <Separator className="my-4" />
                  <div className="text-sm font-semibold">
                    {t('Assets details')}
                  </div>
                  <div className="text-sm">
                    {t('House')}: {calculation.onlyRepayment.totalAssets}€
                  </div>
                  <div className="text-sm">
                    {t('Savings')}: {calculation.onlyRepayment.totalSaved}€
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
                      <AccordionTrigger>
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
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-sm font-semibold text-gray-900"
                                      >
                                        {t('Monthly reduction')}
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-sm font-semibold text-gray-900"
                                      >
                                        {t('Monthly reduction return')}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {calculation.onlyRepayment.paymentDetails.map(
                                      (detail) => (
                                        <tr key={detail.month}>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {detail.month}
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.monthlyPayment}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.interestPaid}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.principalPaid}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.remainingDebt}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.returnOnRepayment
                                              ? `${parseFloat((detail.returnOnRepayment / 12).toFixed(2))}€`
                                              : '-'}
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.returnOnRepaymentPercentage
                                              ? `${detail.returnOnRepaymentPercentage}%`
                                              : '-'}
                                          </td>
                                        </tr>
                                      )
                                    )}
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
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md sm:p-4">
                <dt className="truncate text-md font-bold">
                  {t('Only Invest')}
                </dt>
                <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
                  <div className="text-sm font-semibold mt-1">
                    {t('Resume')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">
                      {t('Total Assets by end')}
                      {calculation.noAction.totalMonths} {t('Months')}:{' '}
                    </span>
                    {parseFloat(
                      (
                        calculation.onlyInvesting.totalAssets +
                        calculation.onlyInvesting.investmentDetails
                          .totalEarnedOnSP
                      ).toFixed(2)
                    )}
                    €
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('From today out pocket')}:{' '}
                    </span>
                    {calculation.onlyInvesting.totalCost +
                      calculation.noAction.totalSaved}
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
                      {t('Past not included')}
                    </p>
                  </div>

                  <Separator className="my-4" />
                  <div className="text-sm font-semibold">
                    {t('Cost details')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">
                      {t('Mortgage Cost')}:{' '}
                    </span>
                    {calculation.onlyInvesting.totalCost}€
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Interest Cost')}:{' '}
                    </span>
                    {calculation.onlyInvesting.totalInterest}€
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Amount Invested')}:{' '}
                    </span>
                    {calculation.noAction.totalSaved}€
                  </div>

                  <Separator className="my-4" />
                  <div className="text-sm font-semibold">
                    {t('Assets details')}
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-extralight">{t('House')}: </span>
                    {calculation.onlyInvesting.totalAssets}€
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">
                      {t('Invested with profit')}:{' '}
                    </span>
                    {
                      calculation.onlyInvesting.investmentDetails
                        .totalEarnedOnSP
                    }
                    €
                  </div>
                  <div className="text-sm">
                    <span className="font-extralight">{t('SP Profit')}: </span>
                    {calculation.onlyInvesting.investmentDetails.totalProfitSP}€
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
                      <AccordionTrigger>
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
                                    {calculation.noAction.paymentDetails.map(
                                      (detail) => (
                                        <tr key={detail.month}>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {detail.month}
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.monthlyPayment}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.interestPaid}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.principalPaid}€
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {detail.remainingDebt}€
                                          </td>
                                        </tr>
                                      )
                                    )}
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
            </dl>
          </div>
        </>
      )}
    </>
  );
}

export default CalculatorTable;
