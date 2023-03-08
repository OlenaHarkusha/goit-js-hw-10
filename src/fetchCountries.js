export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(r => {
    if (!r.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return r.json();
  });
  // .then(data => console.log(data))
  // .catch(error => console.log(error));
}
