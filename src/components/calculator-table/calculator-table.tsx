import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import { CalculationResult } from '../../utils/calculator.utils';

interface Props {
  calculation?: CalculationResult;
}

function CalculatorTable({ calculation }: Props) {
  const { t } = useTranslation();
  const tabs = [
    'Mortgage Without Repayments',
    'Only Repayments',
    'Only Invest',
  ];

  return (
    <>
      {calculation && (
        <>
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {t('Mortgage scenarios')}
            </h3>
            <dl className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.entries(calculation).map(([key, value], i) => (
                <div
                  className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                  key={key}
                >
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {t(tabs[i])}
                  </dt>
                  <dd className="mt-1 text-md font-normal tracking-tight text-gray-900">
                    <div>
                      {t('Mortgage Cost')}: {value.totalCost} €
                    </div>
                    <div>Amortizações: {value.totalSaved}</div>
                    <Separator className="my-4" />
                    <div>
                      Património no final do empréstimo ({value.totalAssets}{' '}
                      {t('months')})
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {t('Month')}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {t('Monthly Payment')}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {t('Interest Paid')}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {t('Principal Paid')}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {t('Remaining Debt')}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {t('Repayment')}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {t('Return on Repayment')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {/*  {calculation.costWithRepayments.paymentDetails.map(
                        (detail) => (
                          <tr key={detail.month}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {detail.month}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {detail.monthlyPayment} €
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {detail.interestPaid} €
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {detail.principalPaid} €
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {detail.remainingDebt} €
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {'-'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {detail.returnOnRepaymentPercentage > 0
                                ? `${detail.returnOnRepaymentPercentage} %`
                                : '-'}
                            </td>
                          </tr>
                        )
                      )} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CalculatorTable;
