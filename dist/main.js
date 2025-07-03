const form = document.querySelector('#countryForm');
const input = document.querySelector('#countryName');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const countryDataSection = document.getElementById('countryData');
// Utility functions to format data
const formatNativeName = (nativeName) => {
    if (!nativeName)
        return 'N/A';
    return Object.values(nativeName)
        .map(name => name.official)
        .join(', ');
};
const formatCurrencies = (currencies) => {
    if (!currencies)
        return 'N/A';
    return Object.entries(currencies)
        .map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
        .join(', ');
};
const formatLanguages = (languages) => {
    if (!languages)
        return 'N/A';
    return Object.values(languages).join(', ');
};
const formatList = (items) => {
    return items?.join(', ') || 'None';
};
// Display country data
const displayCountryData = (country) => {
    document.getElementById('countryOfficialNameDisplay').textContent = country.name.official;
    document.getElementById('countryCapitalDisplay').textContent = country.capital?.join(', ') || 'N/A';
    document.getElementById('countryPopulationDisplay').textContent = country.population.toLocaleString();
    document.getElementById('countryRegionDisplay').textContent = country.region;
    document.getElementById('countrySubregionDisplay').textContent = country.subregion || 'N/A';
    document.getElementById('countryLanguagesDisplay').textContent = formatLanguages(country.languages);
    document.getElementById('countryBordersDisplay').textContent = formatList(country.borders);
    document.getElementById('countryNativeNameDisplay').textContent = formatNativeName(country.name.nativeName);
    document.getElementById('countryCurrencyDisplay').textContent = formatCurrencies(country.currencies);
    document.getElementById('countryTimezonesDisplay').textContent = formatList(country.timezones);
    document.getElementById('countryTldDisplay').textContent = formatList(country.tld);
    // Set flag image
    const flagImg = document.getElementById('countryFlagImage');
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
        document.getElementById(id).textContent = '-';
    });
    const flagImg = document.getElementById('countryFlagImage');
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
        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error('No country found');
        }
        const country = data[0];
        displayCountryData(country);
        countryDataSection.style.display = 'grid';
    }
    catch (error) {
        console.error('Fetch error:', error);
        errorMessage.style.display = 'block';
    }
    finally {
        loadingIndicator.style.display = 'none';
    }
});
// Reset functionality
form?.addEventListener('reset', () => {
    resetDisplay();
    errorMessage.style.display = 'none';
});
export {};
