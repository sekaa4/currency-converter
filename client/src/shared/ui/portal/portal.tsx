import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import type { FC } from 'react';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal: FC<PortalProps> = (props) => {
  const { children, element = document.body } = props;

  return createPortal(children, element);
};
