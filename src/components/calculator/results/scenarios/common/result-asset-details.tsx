import { useTranslation } from 'react-i18next';
import { formatNumber } from '@utils/format-number';

interface Props {
  houseValue: number;
  savings: number;
  profit?: number;
  interestSaved?: number;
  interestSavedIfKeepPayment?: number;
}

export const ResultAssetDetails = ({
  houseValue,
  savings,
  profit,
  interestSaved,
  interestSavedIfKeepPayment,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='text-md font-semibold mt-4'>{t('Assets details')}</div>
      <div className='text-sm mt-1'>
        <span className='text-gray-500'>{t('House')}: </span>
        {formatNumber(houseValue)}€
      </div>

      {profit !== undefined && (
        <div className='text-sm'>
          <span className='text-gray-500'>{t('SP Profit')}: </span>
          {formatNumber(profit)}€
        </div>
      )}

      {interestSaved !== undefined && (
        <div className='text-sm'>
          <span className='text-gray-500'>{t('Interest Saved')}: </span>
          {formatNumber(interestSaved)}€
          {interestSavedIfKeepPayment !== undefined && (
            <>
              {' '}
              ({t('Aditional Saved')}{' '}
              <span className='font-bold'>+{formatNumber(interestSavedIfKeepPayment!)}</span>{' '}
              {t('Keep Monthly Payment')})
            </>
          )}
        </div>
      )}

      <div className='text-sm'>
        <span className='text-gray-500'>{t('Savings')}: </span>
        {formatNumber(savings)}€ {savings > 0 && `(${t('Spare money')})`}
      </div>
    </>
  );
};
