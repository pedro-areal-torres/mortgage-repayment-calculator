import { useTranslation } from 'react-i18next';
import { cn } from '@lib/tw-merge';
import { getScenariosnNetValues } from '@utils/scenarios/get-scenarios-net-values';
import { formatNumber } from '@utils/format-number';
import { LikeIcon } from '@components/icons/like-icon';
import { DislikeIcon } from '@components/icons/dislike-icon';
import { useCalculator } from '@context/useCalculator';

export default function CalculatorTabs() {
  const { t } = useTranslation();
  const { currentTab, setCurrentTab, calculation } = useCalculator();

  const tabsNetValues = getScenariosnNetValues(calculation);

  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        <select
          id='tabs'
          name='tabs'
          value={currentTab}
          onChange={(e) => setCurrentTab(Number(e.target.value))}
          className='block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500'
        >
          {Object.keys(tabsNetValues).map((key, index) => (
            <option key={key} value={index}>
              {t(key)}
            </option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav aria-label='Tabs' className='flex'>
            {Object.entries(tabsNetValues).map(([key, value], index) => (
              <a
                key={key}
                onClick={() => setCurrentTab(index)}
                className={cn(
                  currentTab === index
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium content-center flex flex-col',
                )}
              >
                <div className='flex flex-row gap-1 justify-center items-center text-xs'>
                  {value.best ? <LikeIcon /> : null}
                  {value.worst ? <DislikeIcon /> : null}
                  {t(key)}
                </div>
                <div className='text-lg'>{formatNumber(value.net)}</div>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
