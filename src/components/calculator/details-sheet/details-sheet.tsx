import { useTranslation } from 'react-i18next';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import { formatNumber } from '@utils/format-number';
import { MonthlyPaymentDetails } from '@types';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Separator } from '@components/ui/separator';

interface Props {
  rows: MonthlyPaymentDetails[];
  showReduction?: boolean;
  children: React.ReactNode;
}

export function DetailsSheet({ rows, showReduction = false, children }: Props) {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild className='flex flex-row gap-1.5 items-center justify-center'>
        <Button className='flex flex-row gap-1.5 items-center justify-center'>
          <EyeOpenIcon /> {t('Details')}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-4xl overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>{t('Details')}</SheetTitle>
        </SheetHeader>
        <div className='overflow-x-auto'>
          {children}
          <Separator className='my-4' />
          <div className='text-md font-semibold mt-4'>{t('Payment details')}</div>
          <table className='min-w-full divide-y divide-gray-300 text-center border mt-6'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-3.5 px-4 text-sm font-semibold text-gray-900'>{t('Month')}</th>
                <th className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                  {t('Monthly Payment')}
                </th>
                <th className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                  {t('Interest Paid')}
                </th>
                <th className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                  {t('Principal Paid')}
                </th>
                <th className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                  {t('Remaining Debt')}
                </th>
                {showReduction && (
                  <>
                    <th className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                      {t('Monthly reduction')}
                    </th>
                    <th className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                      {t('Monthly reduction return')}
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {rows.map((detail) => (
                <tr key={detail.month}>
                  <td className='whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900'>
                    {detail.month}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {formatNumber(detail.monthlyPayment)}€
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {formatNumber(detail.interestPaid)}€
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {formatNumber(detail.principalPaid)}€
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {formatNumber(detail.remainingDebt)}€
                  </td>
                  {showReduction && (
                    <>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {detail.lastRepaymentAmount === 0
                          ? detail.monthlyPaymentReduction
                            ? `${formatNumber(detail.monthlyPaymentReduction)}€ (${t('Which')} ${formatNumber(detail.monthlyPaymentSavedInterest)}€ ${t('Are Interest')})`
                            : '-'
                          : `${t('Last Repayment')} ${formatNumber(detail.leftOverFromLastRepayment)}`}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {detail.monthlyPaymentReduction
                          ? `${formatNumber(detail.totalInterestSavedWithRepayment)}€`
                          : '-'}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-end mt-6'>
          <SheetClose asChild>
            <Button variant='secondary'>{t('Close')}</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
