import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Kk7cdMquZ1d0DFO4Bp2pAtCRq9MVE3V1pmTAUJ88WOV41AXqNqrTpLTJTYY104ec';

const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}?breed_ids=${breedId}`);
}
