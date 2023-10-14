import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '../spinner/spinner';

export const Main: FC = () => (
  <main className="flex flex-grow justify-center">
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  </main>
);
