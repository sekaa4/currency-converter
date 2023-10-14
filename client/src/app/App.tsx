import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './providers';

import { StoreProvider } from './providers/store-provider';
import './styles/App.css';

export const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </BrowserRouter>
);
