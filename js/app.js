'use strict';
import { API_KEY } from './apiKey.js';

// DOM Elements
const imgContainer = document.querySelector('#img-container');
const loader = document.querySelector('#loader');

// Global Variables
let imagesLoaded;
let totalImages;
let imagesReady = false;

// Helper function to set attributes on DOM Elements
const setElementAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Checks if all images are loaded. Then, hides the loader and infinity scroll is enabled
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    imagesReady = true;
    loader.hidden = true;
  }
};

// Creates elements for links and photos and add them to the DOM
const displayPhotos = (photos) => {
  imagesLoaded = 0;
  totalImages = photos.length;

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

    img.addEventListener('load', imageLoaded);

    link.append(img);
    imgContainer.append(link);
  });
};

// Gets the data from the API
const getImagesFromApi = async () => {
  const imagesToLoad = 5;
  const apiKey = API_KEY;
  const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imagesToLoad}`;

  const response = await fetch(apiURL);
  const photos = await response.json();

  displayPhotos(photos);
};

/*
window.scrollY -> distance from the top to where the user is scrolling
window.innerHeight -> browser window height
document.body.offsetHeight -> heigth of the body, not visible content included

If the sum of the scroll and the height of the window is greater than that of the body, we are at the bottom of the page, si it´s time to make a new request
*/
const infiniteScroll = () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    imagesReady
  ) {
    imagesReady = false;
    getImagesFromApi();
  }
};

// Event Listeners
window.addEventListener('load', getImagesFromApi);
window.addEventListener('scroll', infiniteScroll);
