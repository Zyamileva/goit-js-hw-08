import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
import { imageGallery } from '../helpers/imageGallery';

const options = {
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  uniqueImages: true,
};

const container = document.querySelector('.gallery');

const gallery = imageGallery(galleryItems);

container.insertAdjacentHTML('beforeend', gallery);

const lightbox = new SimpleLightbox('.gallery a', options);

lightbox.on('show.simplelightbox', function () {
  open;
});
