import { FC } from 'react';

import { Header, Footer } from '..';

export const FallBackError: FC = () => (
  <div className="flex h-full flex-col">
    <Header />
    <main className="flex flex-grow flex-col justify-start gap-y-4 py-20">
      <h3 className="pointer-events-none cursor-default text-base font-medium">
        Something went wrong on the server, when loading page, please reload page
      </h3>
    </main>
    <Footer />
  </div>
);
