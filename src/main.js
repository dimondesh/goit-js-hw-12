import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.id = 'load-more';
loadMoreBtn.classList.add('hidden');
document.body.appendChild(loadMoreBtn);

let query = '';
let page = 1;
let totalHits = 0;
let lightbox;

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = form.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  hideLoadMoreBtn();

  try {
    showLoader();
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Please try again!',
      });
    } else {
      gallery.innerHTML = renderGallery(data.hits);
      lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
      totalHits = data.totalHits;

      if (totalHits > data.hits.length) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    showLoader();
    const data = await fetchImages(query, page);

    gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    lightbox.refresh();

    if (page * 15 >= totalHits) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
