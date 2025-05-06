import Header from '@components/layout/header';
import Body from '@components/layout/body';
import Footer from '@components/layout/footer';

import './App.css';
import { CalculatorProvider } from '@context/useCalculator';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-t from-green-200 to-green-50'>
      <Header />
      <CalculatorProvider>
        <Body />
      </CalculatorProvider>
      <Footer />
    </div>
  );
}

export default App;
