export type ResponseCurrency = {
  value: number;
  iso: string;
  code: number;
  date: string;
  name: string;
};

export type RatesType = Map<string, ResponseCurrency>;
