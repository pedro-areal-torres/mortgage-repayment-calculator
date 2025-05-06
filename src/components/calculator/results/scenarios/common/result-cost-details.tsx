import { formatNumber } from '@utils/format-number';
import { useTranslation } from 'react-i18next';

interface Props {
  totalDebt: number;
  totalInterest: number;
  taxAmount?: number;
}

export const ResultCostDetails = ({ totalDebt, totalInterest, taxAmount }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-md font-semibold mt-4">{t('Cost details')}</div>
      <div className="text-sm mt-1">
        <span className="text-gray-500">{t('Mortgage Cost')}: </span>
        {formatNumber(totalDebt)}€
      </div>
      <div className="text-sm">
        <span className="text-gray-500">{t('Interest Cost')}: </span>
        {formatNumber(totalInterest)}€
      </div>
      {taxAmount !== undefined && (
        <div className="text-sm">
          <span className="text-gray-500">{t('Includes tax')}: </span>
          {formatNumber(taxAmount)}€
        </div>
      )}
    </>
  );
};
