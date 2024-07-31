import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'Repayment vs Investing': 'Repayment vs Investing',
      'Mortgage Calculator': 'Tool developed as part of the article: ',
      'Amount in Debt': 'Amount in Debt',
      'Annual Interest Rate': 'Annual Interest Rate (%)',
      'Payment Term (months)': 'Payment Term (months)',
      Calculate: 'Calculate',
      Month: 'Month',
      'Monthly Payment': 'Monthly Payment',
      'Interest Paid': 'Interest Paid',
      'Principal Paid': 'Principal Paid',
      'Remaining Debt': 'Remaining Debt',
      'Expected Return': 'Expected Return',
      'Expected Repayment every 12 months':
        'Expected Repayment every 12 months',
      'Return on Repayment': 'Return on Repayment',
      'Mortgage scenarios': 'Mortgage scenarios',
      'Mortgage Without Repayments': 'Mortgage Without Repayments',
      Repayment: 'Repayment',
      'Year of Purchase': 'Year of Purchase',
      'Amount Paid': 'Amount Paid',
      Frequency: 'Frequency',
      Anual: 'Annual',
      '2 by 2 y': '2 by 2 years',
      '3 by 3 y': '3 by 3 years',
      '5 by 5 y': '5 by 5 years',
      'Calculator info':
        'Fill in the values assuming you want to amortize your mortgage',
      'Mortgage Cost': 'Mortgage Cost',
      Required: 'Required',
      'Number must be greater than 0': 'Number must be greater than 0',
      'Expected integer, received float': 'Expected integer, received float',
      Savings: 'Savings',
      Assets: 'Assets after',
      Months: 'months',
      MonthL: 'month',
      'Payment details': 'Payment details',
      'House Inflation':
        'Considers a 2% appreciation of the house since the year of purchase',
      'Out pocket': 'Out of pocket',
      House: 'House value',
      'Saving for repayment': 'Amount for repayment/investment',
      Total: 'Total',
      'Interest Saved': 'Interest Saved',
      'Months Saved': 'Months Saved',
      'Only Repayments': 'Only Repayments',
      Resume: 'Resume',
      'Cost details': 'Cost details',
      'Assets details': 'Assets details',
      'Total Assets': 'Total Assets',
      Return: 'Return',
      'From today out pocket': 'From today out pocket',
      'Total Assets by end': 'Total Assets by end',
      'Average Return': 'Average Return',
      'Interest Cost': 'Interest Cost',
      'Repayment done': 'Repayment done',
      'Term reduction': 'Term reduction',
      'Repayment penalty': 'Considers a 2% penalty on each repayment',
      'Amount Invested': 'Amount Invested',
      'SP Profit': 'Profit from investment',
      'Only Invest': 'Only Invest',
      'Most beneficial': 'Most beneficial scenario',
      'Least beneficial': 'Least beneficial scenario',
      'Fifty Fifty': 'Repay and invest (50/50)',
      'Monthly reduction': 'Monthly reduction',
      'Monthly reduction return': 'Return on repayment',
      'Invested with profit': 'Amount invested including profit',
      'Past not included': 'Excludes payments made before today',
      ROIC: 'Return on invested capital (ROIC)',
      'Read Disclaimer': 'Disclaimer',
      Disclaimer:
        'This calculator has been developed to help analyze financial scenarios related to home loans and investments. However, despite efforts to ensure the accuracy of calculations, errors or inaccuracies may occur. We always recommend consulting a qualified financial advisor before making any financial decision based on the results provided by this tool.',
    },
  },
  es: {
    translation: {
      'Repayment vs Investing': 'Amortizar vs Invertir',
      'Mortgage Calculator':
        'Esta herramienta fue desarrollada en el ámbito del artículo: ',
      'Amount in Debt': 'Capital en deuda',
      'Annual Interest Rate': 'TAEG del crédito',
      'Payment Term (months)': 'Plazo restante (meses)',
      Calculate: 'Calcular',
      Month: 'Mes',
      'Monthly Payment': 'Cuota mensual',
      'Interest Paid': 'Intereses',
      'Principal Paid': 'Capital',
      'Remaining Debt': 'Deuda',
      'Expected Return': 'Retorno medio de la inversión',
      'Expected Repayment every 12 months': 'Ahorro estimado',
      'Return on Repayment': 'Rentabilidad',
      'Mortgage scenarios': 'Escenarios',
      'Mortgage Without Repayments': 'No amortizar ni invertir',
      Repayment: 'Amortización',
      'Year of Purchase': 'Año de compra del inmueble',
      'Amount Paid': 'Valor de compra',
      Frequency: 'Frecuencia',
      Anual: 'Anual',
      '2 by 2 y': 'Cada 2 años',
      '3 by 3 y': 'Cada 3 años',
      '5 by 5 y': 'Cada 5 años',
      'Calculator info':
        'Rellena los valores partiendo de la suposición de que quieres amortizar tu crédito hipotecario',
      'Mortgage Cost': 'Costo del capital en deuda',
      Required: 'Campo obligatorio',
      'Number must be greater than 0': 'El valor debe ser positivo',
      'Expected integer, received float': 'El valor debe ser entero',
      Savings: 'Dinero guardado',
      Assets: 'Patrimonio después de',
      Months: 'meses',
      MonthL: 'mes',
      'Payment details': 'Detalles del pago',
      'House Inflation':
        'Considera una valorización del 2% de la casa desde el año de compra',
      'Out pocket': 'Salió de tu bolsillo',
      House: 'Valor de la casa',
      'Saving for repayment': 'Valor para amortizar / invertir',
      Total: 'Total',
      'Interest Saved': 'Al amortizar ahorraste en intereses',
      'Months Saved': 'Anticipaste el plazo del préstamo en',
      'Only Repayments': 'Solo amortizar',
      Resume: 'Resumen',
      'Cost details': 'Detalles de los costos',
      'Assets details': 'Detalles del patrimonio',
      'Total Assets': 'Patrimonio total',
      Return: 'Retorno',
      'From today out pocket': 'Saldrá de tu bolsillo*',
      'Total Assets by end': 'Patrimonio después de ',
      'Average Return': 'Crecimiento medio anual',
      'Interest Cost': 'Pagaste en intereses',
      'Repayment done': 'Amortizaste anticipadamente',
      'Term reduction': 'Reduciste el plazo del préstamo en',
      'Repayment penalty':
        'Considera una penalización del 2% en cada amortización',
      'Amount Invested': 'Monto Invertido',
      'SP Profit': 'Ganancia obtenida con la inversión',
      'Only Invest': 'Solo invertir',
      'Most beneficial': 'Escenario más beneficioso para tu patrimonio',
      'Least beneficial': 'Menos beneficioso',
      'Fifty Fifty': 'Amortizar e invertir (50/50)',
      'Monthly reduction': 'Reducción de la cuota',
      'Monthly reduction return': 'Retorno de la amortización',
      'Invested with profit': 'Monto invertido incluyendo ganancias',
      'Past not included':
        'Excluye cuotas pagadas desde el inicio del préstamo hasta hoy',
      ROIC: 'Rendimiento del capital invertido (ROIC)',
      'Read Disclaimer': 'Disclaimer',
      Disclaimer:
        'Esta calculadora ha sido desarrollada para ayudar a analizar escenarios financieros relacionados con préstamos hipotecarios e inversiones. Sin embargo, a pesar de los esfuerzos realizados para garantizar la exactitud de los cálculos, pueden producirse errores o imprecisiones. Siempre recomendamos consultar a un asesor financiero cualificado antes de tomar cualquier decisión financiera basada en los resultados proporcionados por esta herramienta.',
    },
  },
  pt: {
    translation: {
      'Repayment vs Investing': 'Amortizar vs Investir',
      'Mortgage Calculator': 'Ferramenta desenvolvida no âmbito do artigo: ',
      'Amount in Debt': 'Capital em dívida',
      'Annual Interest Rate': 'TAEG do crédito',
      'Payment Term (months)': 'Prazo restante (meses)',
      Calculate: 'Calcular',
      Month: 'Mês',
      'Monthly Payment': 'Prestação mensal',
      'Interest Paid': 'Juros',
      'Principal Paid': 'Capital',
      'Remaining Debt': 'Dívida',
      'Expected Return': 'Retorno médio do investimento',
      'Expected Repayment every 12 months': 'Poupança estimada',
      'Return on Repayment': 'Rentabilidade',
      'Mortgage scenarios': 'Cenários',
      'Mortgage Without Repayments': 'Não amortizar nem investir',
      Repayment: 'Amortização',
      'Year of Purchase': 'Ano da compra do imóvel',
      'Amount Paid': 'Valor da compra',
      Frequency: 'Frequência',
      Anual: 'Anual',
      '2 by 2 y': '2 em 2 anos',
      '3 by 3 y': '3 em 3 anos',
      '5 by 5 y': '5 em 5 anos',
      'Calculator info':
        'Preencha os valores partindo do pressuposto que pretende amortizar o seu crédito habitação',
      'Mortgage Cost': 'Custo do capital em dívida',
      Required: 'Campo obrigatório',
      'Number must be greater than 0': 'Valor deve ser positivo',
      'Expected integer, received float': 'Vamor deve ser inteiro',
      Savings: 'Dinheiro guardado',
      Assets: 'Património após',
      Months: 'meses',
      MonthL: 'mês',
      'Payment details': 'Detalhes da prestação',
      'House Inflation':
        'Considera valorização de 2% da casa desde o ano da compra',
      'Out pocket': 'Saiu do seu bolso',
      House: 'Valor da casa',
      'Saving for repayment': 'Valor para amortizar / investir',
      Total: 'Total',
      'Interest Saved': 'Ao amortizar poupou em juros',
      'Months Saved': 'Antecipou o prazo do empréstimo em',
      'Only Repayments': 'Apenas amortizar',
      Resume: 'Resumo',
      'Cost details': 'Custos',
      'Assets details': 'Património',
      'Total Assets': 'Património total',
      Return: 'Retorno',
      'From today out pocket': 'Sairá do seu bolso',
      'Total Assets by end': 'Património após ',
      'Average Return': 'Crescimento médio anual',
      'Interest Cost': 'Pagou em juros',
      'Repayment done': 'Amortizou antecipadamente',
      'Term reduction': 'Reduziu o prazo do empréstimo em',
      'Repayment penalty':
        'Considera uma penalização de 2% em cada amortização',
      'Amount Invested': 'Montante investido',
      'SP Profit': 'Lucro obtido com o investimento',
      'Only Invest': 'Apenas investir',
      'Most beneficial': 'Cenário mais benéfico',
      'Least beneficial': 'Cenários menos benéfico',
      'Fifty Fifty': 'Amortizar e investir (50/50)',
      'Monthly reduction': 'Redução da prestação',
      'Monthly reduction return': 'Retorno da amortização',
      'Invested with profit': 'Montante investido incluindo lucros',
      'Past not included':
        'Exclui custos com prestações pagas anteriores à data de hoje',
      ROIC: 'Retorno sobre capital investido (ROIC)',
      'Read Disclaimer': 'Disclaimer',
      Disclaimer:
        'Esta calculadora foi desenvolvida para ajudar na análise de cenários financeiros relacionados ao crédito habitação e investimentos. No entanto, apesar dos esforços para garantir a precisão dos cálculos, podem ocorrer erros ou imprecisões. Recomendamos sempre consultar um consultor financeiro qualificado antes de tomar qualquer decisão financeira baseada nos resultados fornecidos por esta ferramenta.',
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
