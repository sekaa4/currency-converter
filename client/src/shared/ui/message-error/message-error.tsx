import type { FC } from 'react';

interface MessageErrorProps {
  text?: string;
  list?: boolean;
}

export const MessageError: FC<MessageErrorProps> = (props) => {
  const { text, list } = props;

  return (
    <div
      className={`${
        list ? 'top-[60px]' : '-top-0.5'
      } 'pointer-events-none absolute -top-0.5 w-full cursor-default text-center text-base font-normal text-red-600`}
    >
      {text || 'Something wrong on the server side, try later'}
    </div>
  );
};
