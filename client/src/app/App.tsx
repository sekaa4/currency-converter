import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './providers/router';

import './styles/App.css';

export const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
