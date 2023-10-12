import { FC } from 'react';

interface InputCurrencyProp {
  name: string;
  value: string;
}

export const InputCurrency: FC<InputCurrencyProp> = (props) => {
  const { name, value } = props;

  return (
    <div className="form-control w-full max-w-xs py-4">
      <div className="flex flex-row">
        <label className="label relative" htmlFor="US">
          <span className="label-text">{name} fgdfgdfg</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs text-black"
          id="US"
        />
      </div>

      <label className="label relative" htmlFor="US">
        <span className="label-text-alt absolute right-0">{value}Bottom Right label</span>
      </label>
    </div>
  );
};
