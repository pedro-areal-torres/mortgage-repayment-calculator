import { useTranslation } from 'react-i18next';

export default function CalculatorInfoRepaymentPenalty() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-1 items-center mt-2">
      <svg fill="currentColor" color="gray" viewBox="0 0 16 16" height=".8rem" width=".8rem">
        <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      <p className="text-xs leading-6 text-slate-500">{t('Repayment penalty')}</p>
    </div>
  );
}
