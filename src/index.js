import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const ref = {
  breedsSelectEl: document.querySelector('.breed-select'),
  infoCatEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

const { breedsSelectEl, infoCatEl, loaderEl, errorEl } = ref;

breedsSelectEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');
infoCatEl.classList.add('is-hidden');

fetchBreeds()
  .then(({ data }) => {
    let breedsArr = [];
    data.forEach(cat => {
      breedsSelectEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
      errorEl.classList.add('is-hidden');
      breedsArr.push({ value: cat.id, text: cat.name });
    });
    new SlimSelect({
      select: breedsSelectEl,
      data: breedsArr,
      settings: {
        allowDeselect: true,
      },
    });
  })
  .catch(hendlerErrore);

breedsSelectEl.addEventListener('change', handlerCat);

function handlerCat(e) {
  loaderEl.classList.remove('is-hidden');
  infoCatEl.classList.add('is-hidden');

  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(({ data }) => {
      loaderEl.classList.add('is-hidden');
      infoCatEl.classList.remove('is-hidden');

      const { url, breeds } = data[0];
      renderCat(url, breeds);
    })
    .catch(hendlerErrore);
}
function renderCat(url, breeds) {
  infoCatEl.innerHTML = `<img src="${url}" alt="${breeds[0].name} " width="400">
        <div class="wrapper-text"><h1 class="">${breeds[0].name} (${breeds[0].country_code})</h1>
      <p class="">${breeds[0].description}</p></div>`;
}

function hendlerErrore(err) {
  loaderEl.classList.add('is-hidden');
  errorEl.classList.remove('is-hidden');
  infoCatEl.classList.add('is-hidden');

  Notiflix.Notify.failure(`${errorEl.textContent}`, {
    position: 'center-center',
  });
}
