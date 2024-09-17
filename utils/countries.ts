import countries from 'world-countries';

export const formattedCountries = countries.map((item) => {
  return {
    code: item.cca2,
    name: item.name.common,
    flag: item.flag,
    location: item.latlng,
    region: item.region
  }
})

export const findCountryByCode = (countryCode: string) => formattedCountries.find((country) => country.code === countryCode);