import { useTranslation } from 'react-i18next';
import { formatNumber } from '@utils/format-number';

interface Props {
  totalAssets: number;
  outOfPocket: number;
  netResult: number;
}

export const ResultResume = ({ totalAssets, outOfPocket, netResult }: Props) => {
  const { t } = useTranslation();
  return (
    <div className='mt-1.5'>
      <div className='text-sm'>
        <span className='text-gray-500'>{t('Result')}: </span>
        <span className='text-green-600 font-bold'>{formatNumber(netResult)}€</span>
      </div>
      <div className='text-sm'>
        <span className='text-gray-500'>{t('Total Assets by end')}: </span>
        {formatNumber(totalAssets)}€
      </div>
      <div className='text-sm'>
        <span className='text-gray-500'>{t('From today out pocket')}: </span>
        {formatNumber(outOfPocket)}€
      </div>
    </div>
  );
};
