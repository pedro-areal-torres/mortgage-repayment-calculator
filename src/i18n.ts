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
      'Repayment vs Investing': 'Amortizar vs Investir',
      'Mortgage Calculator':
        'Esta ferramenta apresenta-lhe diferentes cenários para a gestão do seu crédito habitação',
      'Amount in Debt': 'Capital em dívida',
      'Annual Interest Rate': 'TAEG do crédito',
      'Payment Term (months)': 'Prazo de pagamento (meses)',
      Calculate: 'Calcular',
      Month: 'Mês',
      'Monthly Payment': 'Prestação mensal',
      'Interest Paid': 'Juros',
      'Principal Paid': ' Pago',
      'Remaining Debt': 'Dívida',
      'Expected Return': 'Retorno médio do investimento',
      'Expected Repayment every 12 months': 'Amortização estimada',
      'Return on Repayment': 'Rentabilidade',
      'Mortgage scenarios': 'Cenários',
      'Mortgage Without Repayments': 'Não amortizar nem investir',
      Repayment: 'Amortização',
      'Year of Purchase': 'Ano da compra do imóvel',
      'Amount Paid': 'Valor da compra',
      Frequency: 'Frequência da amortização',
      Anual: 'Anual',
      '2 by 2 y': '2 em 2 anos',
      '3 by 3 y': '3 em 3 anos',
      '5 by 5 y': '5 em 5 anos',
      'Calculator info':
        'Preencha os valores partindo do pressuposto que pretende amortizar o seu crédito habitação',
      'Mortgage Cost': 'Mortgage Cost',
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
