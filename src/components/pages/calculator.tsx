import CalculatorForm from '../calculator-form/calculator-form';

interface Props {
  setCalculationDetails: any;
}

const Calculator = ({ setCalculationDetails }: Props) => {
  return (
    <div className="p-4">
      <CalculatorForm setCalculationDetails={setCalculationDetails} />
    </div>
  );
};

export default Calculator;
