interface Country {
  name: {
    common: string;
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
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
}

const form = document.querySelector<HTMLFormElement>('#countryForm');
const input = document.querySelector<HTMLInputElement>('#countryName');

form?.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const countryName = input?.value.trim();
  if (!countryName) {
    alert('Please enter a country name');
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data: Country[] = await response.json();

    const country = data[0];
    console.log(country);

    
    (document.querySelector('#countryNameDisplay') as HTMLElement).textContent = country.name.common;
    (document.querySelector('#countryCapitalDisplay') as HTMLElement).textContent = country.capital?.[0] ?? 'N/A';
    (document.querySelector('#countryPopulationDisplay') as HTMLElement).textContent = country.population.toLocaleString();
    (document.querySelector('#countryRegionDisplay') as HTMLElement).textContent = country.region;
    (document.querySelector('#countryLanguagesDisplay') as HTMLElement).textContent =
      Object.values(country.languages ?? {}).join(', ') || 'N/A';
    (document.querySelector('#countryBordersDisplay') as HTMLElement).textContent =
      (country.borders ?? []).join(', ') || 'None';
    (document.querySelector('#countryNativeNameDisplay') as HTMLElement).textContent =
      Object.values(country.name.nativeName ?? {})[0]?.common ?? 'N/A';

  } catch (error) {
    alert('Country not found or error fetching data.');
    console.error(error);
  }
});