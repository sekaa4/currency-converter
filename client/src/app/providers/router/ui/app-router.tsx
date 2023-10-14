import { Routes, Route } from 'react-router-dom';

import { routeConfig } from '@/shared/config/route-config/route-config';
import { routerPath } from '@/shared/lib/constants/app-routes';
import { Layout } from '@/widgets';

const AppRouter = () => (
  <Routes>
    <Route path={routerPath.main} element={<Layout />}>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
  </Routes>
);

export default AppRouter;
