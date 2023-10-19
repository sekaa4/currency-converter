import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '../spinner/spinner';

export const Main: FC = () => (
  <main className="m-auto flex flex-grow">
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  </main>
);
