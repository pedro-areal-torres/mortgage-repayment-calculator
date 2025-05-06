import { CalculatorIcon } from '@components/icons/calculator-icon';
import LanguageSwitcher from '@components/language-switcher/language-switcher';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 flex-row items-center gap-2">
          <CalculatorIcon />
          <h1 className="text-xl font-bold hidden sm:block">{t('Repayment vs Investing')}</h1>
        </div>
        <div className="flex flex-row gap-2 items-center ">
          <LanguageSwitcher />
          <a href="https://www.oamadorfinanceiro.pt/p/amortizar-credito-habitacao-vs-investir-em-etf" target="_blank">
            <span className="py-2 px-4 rounded-md bg-green-500 text-white hover:text-black transition duration-300 ease-in-out hover:bg-green-600">
              {t('Read Article')}
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
