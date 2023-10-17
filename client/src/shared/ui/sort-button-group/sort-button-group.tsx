import { FC } from 'react';

export const SortButtonGroup: FC = () => (
  // console.log('first');
  <div className="join flex w-full">
    <div className="btn join-item pointer-events-none h-4 cursor-default">Sort-By</div>
    <div className="divider divider-horizontal" />
    <input
      className="btn join-item rounded-s-3xl"
      type="radio"
      name="options"
      aria-label="Radio 2"
    />
    <input className="btn join-item" type="radio" name="options" aria-label="Radio 3" />
  </div>
);
