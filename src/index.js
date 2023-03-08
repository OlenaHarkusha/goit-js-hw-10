import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryName = refs.input.value.trim();

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (countryName) {
    fetchCountries(countryName)
      .then(array => {
        if (array.length === 1) {
          insertCountryInfo(array[0]);
          return;
        }
        insertList(array);
      })
      .catch(error =>
        Notify.failure('Oops, there is no country with that name')
      );
  }
}

function renderListItem(item) {
  return `<li>
        <img src="${item.flags.svg}" alt="${item.flags.alt}" width='25'>
        <p> ${item.name.common}</p>
      </li>`;
}

function renderList(array) {
  return array?.reduce((acc, item) => acc + renderListItem(item), '');
}

function insertList(array) {
  if (array.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  const result = renderList(array);
  refs.countryList.insertAdjacentHTML('beforeend', result);
}

function renderCountryInfo(item) {
  return `<h1>
        <img src="${item.flags.svg}" alt="${item.flags.alt}" width="40" />
        ${item.name.common}
      </h1>
      <p><b>Capital:</b> ${item.capital}</p>
      <p><b>Population:</b> ${item.population}</p>
      <p><b>Languages:</b> ${Object.values(item.languages)}</p>`;
}

function insertCountryInfo(item) {
  const res = renderCountryInfo(item);
  refs.countryInfo.insertAdjacentHTML('beforeend', res);
}
