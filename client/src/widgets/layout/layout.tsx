import { FC, Suspense } from 'react';

import { Main, Footer, Header } from '@/shared/ui';
import { Spinner } from '@/shared/ui/spinner/spinner';

export const Layout: FC = () => (
  <div className="flex h-full flex-col">
    <Header />
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
    <Footer />
  </div>
);
