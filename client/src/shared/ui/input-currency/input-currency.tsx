import { ChangeEvent, FC } from 'react';

interface InputCurrencyProp {
  name: string;
  value: number | string;
  iso: string;
  code: number;
  // inputObj?: RequestObj;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputCurrency: FC<InputCurrencyProp> = (props) => {
  // const [getCurrenciesRates, { data, error, isLoading, isUninitialized, isFetching }] =
  //   useLazyFetchCurrenciesRatesFromAPI();

  const { name, value, iso, code, onChange } = props;

  // const onChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   console.log('event', event);
  //   const { value } = event.target;
  //   {
  //     iso = RequestObjDefaultParams.ISO,
  //     value = RequestObjDefaultParams.VALUE,
  //     code = RequestObjDefaultParams.CODE,
  //   } = {} as RequestObj,
  //   getCurrenciesRates();
  // }, []);

  return (
    <div className="form-control w-full max-w-xs gap-1 py-4">
      <div className="flex flex-row gap-4">
        <label className="label relative" htmlFor={iso}>
          <span className="label-text">{iso}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs text-black"
          id={iso}
          value={value}
          onChange={onChange}
          data-code={code}
          pattern="[0-9]+([\.][0-9]+)?"
          step="0.01"
        />
      </div>

      <label className="label relative" htmlFor={iso}>
        <span className="label-text-alt absolute right-0 font-normal">{name}</span>
      </label>
    </div>
  );
};
