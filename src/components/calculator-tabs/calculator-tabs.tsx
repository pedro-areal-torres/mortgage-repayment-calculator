import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

interface Props {
  currentTab: number;
  setCurrentTab: (index: number) => void;
}

export default function CalculatorTabs({ currentTab, setCurrentTab }: Props) {
  const { t } = useTranslation();

  const tabs = [
    t('Mortgage Without Repayments'),
    t('Only Repayments'),
    t('Only Invest'),
    t('Fifty Fifty'),
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          defaultValue={t('Mortgage Without Repayments')}
          className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
        >
          {tabs.map((tab, index) => (
            <option key={tab} onClick={() => setCurrentTab(index)}>
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex">
            {tabs.map((tab, index) => (
              <a
                key={tab}
                onClick={() => setCurrentTab(index)}
                className={cn(
                  currentTab === index
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium'
                )}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
