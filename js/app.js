'use strict';
import { API_KEY } from './apiKey.js';
const imgContainer = document.querySelector('#img-container');
const loader = document.querySelector('#loader');

const setElementAttributes = (element, attributes) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = (photos) => {
  photos.forEach((photo) => {
    const link = document.createElement('a');
    const img = document.createElement('img');

    setElementAttributes(link, {
      href: photo.links.html,
      target: '_blank',
    });

    setElementAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    link.append(img);
    imgContainer.append(link);
  });
};

const getImagesFromApi = async () => {
  const imagesToLoad = 5;
  const apiKey = API_KEY;
  const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imagesToLoad}`;

  const response = await fetch(apiURL);
  const photos = await response.json();

  displayPhotos(photos);
};

// Event Listeners
window.addEventListener('load', getImagesFromApi);
