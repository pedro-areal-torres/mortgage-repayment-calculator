import './App.css';
import Maintenance from '@components/maintenance/maintenance';
import Header from '@components/layout/header';
import Body from '@components/layout/body';
import Footer from '@components/layout/footer';

function App() {
  const onMaintenance = import.meta.env.ON_MAINTENANCE;

  if (onMaintenance) {
    <Maintenance />;
  }

  return (
    <div className="bg-white">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
