
import { Country } from './types.js';

const form = document.querySelector<HTMLFormElement>('#countryForm');
const input = document.querySelector<HTMLInputElement>('#countryName');
const loadingIndicator = document.getElementById('loadingIndicator') as HTMLElement;
const errorMessage = document.getElementById('errorMessage') as HTMLElement;
const countryDataSection = document.getElementById('countryData') as HTMLElement;

// Utility functions to format data
const formatNativeName = (nativeName: Country['name']['nativeName']): string => {
    if (!nativeName) return 'N/A';
    return Object.values(nativeName)
        .map(name => name.official)
        .join(', ');
};

const formatCurrencies = (currencies: Country['currencies']): string => {
    if (!currencies) return 'N/A';
    return Object.entries(currencies)
        .map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
        .join(', ');
};

const formatLanguages = (languages: Country['languages']): string => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
};

const formatList = (items: string[] | undefined): string => {
    return items?.join(', ') || 'None';
};

// Display country data
const displayCountryData = (country: Country) => {
    (document.getElementById('countryOfficialNameDisplay') as HTMLElement).textContent = country.name.official;
    (document.getElementById('countryCapitalDisplay') as HTMLElement).textContent = country.capital?.join(', ') || 'N/A';
    (document.getElementById('countryPopulationDisplay') as HTMLElement).textContent = country.population.toLocaleString();
    (document.getElementById('countryRegionDisplay') as HTMLElement).textContent = country.region;
    (document.getElementById('countrySubregionDisplay') as HTMLElement).textContent = country.subregion || 'N/A';
    (document.getElementById('countryLanguagesDisplay') as HTMLElement).textContent = formatLanguages(country.languages);
    (document.getElementById('countryBordersDisplay') as HTMLElement).textContent = formatList(country.borders);
    (document.getElementById('countryNativeNameDisplay') as HTMLElement).textContent = formatNativeName(country.name.nativeName);
    (document.getElementById('countryCurrencyDisplay') as HTMLElement).textContent = formatCurrencies(country.currencies);
    (document.getElementById('countryTimezonesDisplay') as HTMLElement).textContent = formatList(country.timezones);
    (document.getElementById('countryTldDisplay') as HTMLElement).textContent = formatList(country.tld);
    
    // Set flag image
    const flagImg = document.getElementById('countryFlagImage') as HTMLImageElement;
    flagImg.src = country.flags.png;
    flagImg.alt = country.flags.alt || `Flag of ${country.name.common}`;
};

// Reset display
const resetDisplay = () => {
    const elements = [
        'countryOfficialNameDisplay', 'countryCapitalDisplay', 'countryPopulationDisplay',
        'countryRegionDisplay', 'countrySubregionDisplay', 'countryLanguagesDisplay',
        'countryBordersDisplay', 'countryNativeNameDisplay', 'countryCurrencyDisplay',
        'countryTimezonesDisplay', 'countryTldDisplay'
    ];
    
    elements.forEach(id => {
        (document.getElementById(id) as HTMLElement).textContent = '-';
    });
    
    const flagImg = document.getElementById('countryFlagImage') as HTMLImageElement;
    flagImg.src = '';
    flagImg.alt = '';
};

form?.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const countryName = input?.value.trim();
    if (!countryName) {
        alert('Please enter a country name');
        return;
    }
    
    try {
        loadingIndicator.style.display = 'block';
        errorMessage.style.display = 'none';
        countryDataSection.style.display = 'none';
        resetDisplay();
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Country[] = await response.json();
        if (!data || data.length === 0) {
            throw new Error('No country found');
        }
        
        const country = data[0];
        displayCountryData(country);
        countryDataSection.style.display = 'grid';
        
    } catch (error) {
        console.error('Fetch error:', error);
        errorMessage.style.display = 'block';
    } finally {
        loadingIndicator.style.display = 'none';
    }
});

// Reset functionality
form?.addEventListener('reset', () => {
    resetDisplay();
    errorMessage.style.display = 'none';
});