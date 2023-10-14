import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Main: FC = () => (
  <main className="flex flex-grow items-center">
    <Outlet />
  </main>
);
