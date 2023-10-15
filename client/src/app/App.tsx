import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './providers';

import { StoreProvider } from './providers/store-provider';

import './styles/App.css';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import { FallBackError } from '@/shared/ui/fall-back-error/fall-back-error';

export const App = () => (
  <BrowserRouter>
    <ErrorBoundary fallBackUIComponent={<FallBackError />}>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
