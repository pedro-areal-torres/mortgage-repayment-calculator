import { createContext, useContext, useState } from 'react';
import { CalculationResult } from '@types';

type CalculatorContextType = {
  calculation?: CalculationResult;
  setCalculation: (calc: CalculationResult) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  currentTab: number;
  setCurrentTab: (tab: number) => void;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [calculation, setCalculation] = useState<CalculationResult>();
  const [showForm, setShowForm] = useState(true);
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <CalculatorContext.Provider
      value={{ calculation, setCalculation, showForm, setShowForm, currentTab, setCurrentTab }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error('useCalculator must be used within CalculatorProvider');
  return context;
};
