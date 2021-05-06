import GalleryItems from './gallery-items.js'

const galleryContainer = document.querySelector('.js-gallery')
const galleryMarkup = createGalleryItemsMarkup(GalleryItems)
const lightbox = document.querySelector('.js-lightbox')
const lightboxImage = lightbox.querySelector('.lightbox__image')
const closeLightboxBtn = document.querySelector(
  '[data-action="close-lightbox"]'
)
const lightboxOverlay = document.querySelector('.lightbox__overlay')

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)

galleryContainer.addEventListener('click', onGalleryContainerClick)
closeLightboxBtn.addEventListener('click', onLightboxClose)
lightboxOverlay.addEventListener('click', onLightboxClose)

function createGalleryItemsMarkup () {
  return GalleryItems.map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
    <a
      class="gallery__link" 
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `
  }).join('')
}

function onGalleryContainerClick (event) {
  event.preventDefault()

  if (event.target.nodeName === 'IMG') {
    lightbox.classList.add('is-open')
    lightboxImage.src = event.target.dataset.source
    lightboxImage.alt = event.target.alt

    window.addEventListener('keydown', onLightboxClose)
  }
}

function onLightboxClose (event) {
  event.preventDefault()

  if (
    event.target.nodeName === 'BUTTON' ||
    event.target.classList.contains('lightbox__overlay') ||
    event.keyCode === 27
  ) {
    lightbox.classList.remove('is-open')
    lightboxImage.src = ''
    lightboxImage.alt = ''

    window.removeEventListener('keydown', onLightboxClose)
  }
}
