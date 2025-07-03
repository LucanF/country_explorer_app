export interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  currencies?: {
    [key: string]: Currency;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  tld?: string[];
  timezones?: string[];
}
