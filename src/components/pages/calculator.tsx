import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MortgageCalculationResult } from '../../utils/calculator.utils';
import LanguageSwitcher from '../language-switcher/language-switcher';
import CalculatorForm from '../calculator-form/calculator-form';

interface CalculationResult {
  costNoRepayments: MortgageCalculationResult;
  costWithRepayments: MortgageCalculationResult;
}

const App: React.FC = () => {
  const { t } = useTranslation();
  const [calculation, setCalculationDetails] = useState<CalculationResult>();

  return (
    <div className="App">
      <LanguageSwitcher />
      <h1>{t('Mortgage Calculator')}</h1>
      <CalculatorForm setCalculationDetails={setCalculationDetails} />
      {calculation && (
        <>
          <div>
            <h2>
              {t('Total Cost of Mortgage Without Repayments')}: $
              {calculation.costNoRepayments.totalCost}
            </h2>
            <h2>
              {t('Total Cost of Mortgage With Repayments')}: $
              {calculation.costWithRepayments.totalCost}
            </h2>
            <h2>
              {t('Total Spent on Repayments')}: $
              {`${calculation.costWithRepayments.repaymentDetails.repaymentsAmount} (${calculation.costWithRepayments.repaymentDetails.repaymentsCount})`}
            </h2>
            <h2>
              {t('Total Earned on S&P')}:
              {calculation.costWithRepayments.investmentDetails.totalEarnedOnSP}
            </h2>
            <h2>
              {t('Profit Earned on S&P')}:
              {calculation.costWithRepayments.investmentDetails.totalProfitSP}
            </h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>{t('Month')}</th>
                <th>{t('Monthly Payment')}</th>
                <th>{t('Interest Paid')}</th>
                <th>{t('Principal Paid')}</th>
                <th>{t('Remaining Debt')}</th>
                <th>{t('returnOnRepayment')}</th>
                <th>{t('returnOnRepaymentPercentage')}</th>
              </tr>
            </thead>
            <tbody>
              {calculation.costWithRepayments.paymentDetails.map((detail) => (
                <tr key={detail.month}>
                  <td>{detail.month}</td>
                  <td>${detail.monthlyPayment}</td>
                  <td>${detail.interestPaid}</td>
                  <td>${detail.principalPaid}</td>
                  <td>${detail.remainingDebt}</td>
                  <td>${detail.returnOnRepayment}</td>
                  <td>${detail.returnOnRepaymentPercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
