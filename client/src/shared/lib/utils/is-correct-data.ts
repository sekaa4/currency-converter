import { RatesStateFromServer } from '@/entities/form-currencies/model/types/rates-state.interface';

export const isCorrectData = (
  data: unknown | RatesStateFromServer,
): data is RatesStateFromServer => {
  if (
    data &&
    typeof data === 'object' &&
    'rates' in data &&
    'timestamp' in data &&
    'sort' in data
  ) {
    return true;
  }
  return false;
};
