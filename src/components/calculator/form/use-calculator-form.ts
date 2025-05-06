import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculate } from '@utils/calculate-scenarios';
import { CalculationResult } from '@types';
import { calculatorFormSchema } from './calculator-form.schema';

interface Props {
  setCalculation: (calc: CalculationResult) => void;
  setShowForm: (show: boolean) => void;
}

export const useCalculatorForm = ({ setCalculation, setShowForm }: Props) => {
  const form = useForm<z.infer<typeof calculatorFormSchema>>({
    resolver: zodResolver(calculatorFormSchema),
  });

  const onSubmit = (values: z.infer<typeof calculatorFormSchema>) => {
    const result = calculate(values);
    setCalculation(result);
    setShowForm(false);
  };

  return { form, onSubmit };
};
