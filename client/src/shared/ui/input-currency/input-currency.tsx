import { ChangeEvent, FC } from 'react';

interface InputCurrencyProp {
  name: string;
  value: number | string;
  iso: string;
  code: number;
  custom?: boolean;
  isValid: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickDeleteCurrency?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const InputCurrency: FC<InputCurrencyProp> = (props) => {
  const { name, value, iso, code, custom, isValid, onChange, handleClickDeleteCurrency } = props;

  const error = isValid ? 'input-info' : 'input-info';

  console.log('errorINPUT', error);

  return (
    <div className="form-control w-full gap-1 py-4">
      <div className="relative flex flex-row gap-4">
        <label className="label relative" htmlFor={iso}>
          <span className="label-text">{iso}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className={`${error} input input-bordered relative max-h-10 w-full max-w-xs text-black`}
          id={iso}
          value={value}
          onChange={onChange}
          data-code={code}
          step="0.01"
        />
        {custom && (
          <button
            className="absolute bottom-0 right-0 block h-10 w-9"
            type="button"
            data-iso={iso}
            onClick={handleClickDeleteCurrency}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-violet-950"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
              />
              <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
              <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
            </svg>
          </button>
        )}
      </div>

      <label className="label relative flex" htmlFor={iso}>
        <span className="label-text-alt absolute right-0 font-normal">{name}</span>
      </label>
    </div>
  );
};
