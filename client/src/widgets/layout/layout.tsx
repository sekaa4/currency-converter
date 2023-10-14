import { FC } from 'react';

import { Main, Footer, Header } from '@/shared/ui';

export const Layout: FC = () => (
  <div className="flex h-full flex-col">
    <Header />
    <Main />
    <Footer />
  </div>
);
