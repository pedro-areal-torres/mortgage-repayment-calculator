import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'Mortgage Calculator': 'Mortgage Calculator',
      'Amount in Debt': 'Amount in Debt',
      'Annual Interest Rate (%)': 'Annual Interest Rate (%)',
      'Payment Term (months)': 'Payment Term (months)',
      Calculate: 'Calculate',
      Month: 'Month',
      'Monthly Payment': 'Monthly Payment',
      'Interest Paid': 'Interest Paid',
      'Principal Paid': 'Principal Paid',
      'Remaining Debt': 'Remaining Debt',
      'Expected Repayment every 12 months':
        'Expected Repayment every 12 months',
    },
  },
  es: {
    translation: {
      'Mortgage Calculator': 'Calculadora de Hipoteca',
      'Amount in Debt': 'Monto de la Deuda',
      'Annual Interest Rate (%)': 'Tasa de Interés Anual (%)',
      'Payment Term (months)': 'Plazo de Pago (meses)',
      Calculate: 'Calcular',
      Month: 'Mes',
      'Monthly Payment': 'Pago Mensual',
      'Interest Paid': 'Interés Pagado',
      'Principal Paid': 'Principal Pagado',
      'Remaining Debt': 'Deuda Restante',
      'Expected Repayment every 12 months': 'Reembolso esperado cada 12 meses',
    },
  },
  pt: {
    translation: {
      'Mortgage Calculator':
        'Esta ferramenta apresenta-lhe diferentes cenários no pagamento do seu  calcular o valor da prestação do crédito habitação antecipado',
      'Amount in Debt': 'Capital em dívida',
      'Annual Interest Rate': 'Taxa de Juro',
      'Payment Term (months)': 'Prazo de Pagamento (meses)',
      Calculate: 'Calcular',
      Month: 'Mês',
      'Monthly Payment': 'Prestação Mensal',
      'Interest Paid': 'Juros',
      'Principal Paid': ' Pago',
      'Remaining Debt': 'Dívida',
      'Expected Return SP': 'Retorno médio S&P500',
      'Expected Repayment every 12 months':
        'Amortização estimada a cada 12 meses',
    },
  },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
