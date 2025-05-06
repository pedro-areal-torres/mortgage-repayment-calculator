// components/calculator/form/components/FormSelectField.tsx

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useTranslation } from 'react-i18next';

interface Props {
  name: string;
  control: any;
  label: string;
  options: { value: string; label: string }[];
}

export default function FormSelectField({ name, control, label, options }: Props) {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(label)}</FormLabel>
          <Select
            onValueChange={(val) => field.onChange(Number(val))}
            defaultValue={String(field.value)}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {t(opt.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
