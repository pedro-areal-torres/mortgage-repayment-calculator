import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent } from '@components/ui/card';
import { ChartContainer } from '@components/ui/chart';
import { chartConfig, generateNetWorthChartData } from '@utils/chart/generate-chart-data';
import { useTranslation } from 'react-i18next';
import { useCalculator } from '@context/useCalculator';

export default function ChartResult() {
  const { t } = useTranslation();
  const { calculation, currentTab } = useCalculator();

  const chartData = generateNetWorthChartData({ calculation, currentTab });

  return (
    <Card>
      <CardContent className='px-2 sm:p-4'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16,
              right: 12,
              left: 32,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  year: 'numeric',
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(value)
              }
            />
            <Legend formatter={(value) => t(value)} />
            {Object.entries(chartConfig).map(([key, value]) => (
              <Line key={key} type='monotone' dataKey={key} stroke={value.color} dot={false} />
            ))}
          </LineChart>
        </ChartContainer>

        <div className='flex flex-row gap-1 items-center text-xs text-slate-500 mt-2'>
          <svg
            fill='currentColor'
            color='gray'
            viewBox='0 0 16 16'
            height='.8rem'
            width='.8rem'
            className='hidden sm:block'
          >
            <path d='M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z' />
          </svg>
          <span>{t('chartNotAtScale')}</span>
        </div>
      </CardContent>
    </Card>
  );
}
