import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createReduxStore, RootState } from '../store/store';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: RootState;
}
const store = createReduxStore();

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;

  return (
    <Provider store={store} serverState={initialState}>
      {children}
    </Provider>
  );
};
