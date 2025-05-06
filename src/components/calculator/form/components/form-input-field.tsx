// components/calculator/form/components/FormFieldWithAdornment.tsx

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { cn } from '@lib/tw-merge';
import { useTranslation } from 'react-i18next';

interface Props {
  name: string;
  placeholder: string;
  adornment?: string;
  control: any;
  step?: string;
  label: string;
  type?: 'number' | 'text';
}

export default function FormFieldWithAdornment({
  name,
  control,
  placeholder,
  adornment,
  step = 'any',
  label,
  type = 'number',
}: Props) {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(label)}</FormLabel>
          <FormControl>
            <div className={cn('relative w-full rounded-md')}>
              <Input
                type={type}
                step={step}
                placeholder={placeholder}
                {...field}
                className='flex w-full flex-col'
              />
              {adornment && (
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span className='text-gray-500 sm:text-sm'>{adornment}</span>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
