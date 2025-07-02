"use strict";
const form = document.querySelector('#countryForm');
const input = document.querySelector('#countryName');
form?.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload
    const countryName = input?.value.trim();
    if (!countryName) {
        alert('Please enter a country name');
        return;
    }
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];
        console.log(country);
        document.querySelector('#countryNameDisplay').textContent = country.name.common;
        document.querySelector('#countryCapitalDisplay').textContent = country.capital?.[0] ?? 'N/A';
        document.querySelector('#countryPopulationDisplay').textContent = country.population.toLocaleString();
        document.querySelector('#countryRegionDisplay').textContent = country.region;
        document.querySelector('#countryLanguagesDisplay').textContent =
            Object.values(country.languages ?? {}).join(', ') || 'N/A';
        document.querySelector('#countryBordersDisplay').textContent =
            (country.borders ?? []).join(', ') || 'None';
        document.querySelector('#countryNativeNameDisplay').textContent =
            Object.values(country.name.nativeName ?? {})[0]?.common ?? 'N/A';
    }
    catch (error) {
        alert('Country not found or error fetching data.');
        console.error(error);
    }
});
