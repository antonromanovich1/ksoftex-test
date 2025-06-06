export interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export interface CurrencyResponse {
  data: {
    [key: string]: Currency;
  };
}

export interface CurrencyRate {
  data: {
    [key: string]: number;
  };
}
