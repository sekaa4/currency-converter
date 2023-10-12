import './styles/App.css';

import { InputCurrency } from '@/shared/ui/input-currency/input-currency';
import { Navigation } from '@/widgets/navigation';

function App() {
  // <h1 className="text-white-500 text-center text-3xl font-bold underline">Hello world!</h1>
  return (
    <div>
      <div>
        <Navigation />
        <InputCurrency name="" value="" />
      </div>
    </div>
  );
}

export default App;
