import React, { useEffect } from 'react';

export const useOutsideClick = (
  elementRef: React.RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        event.stopPropagation();
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [callback, elementRef]);
};
