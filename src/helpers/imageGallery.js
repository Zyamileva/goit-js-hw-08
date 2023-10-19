function imageGallery(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }, index) =>
        `<li class="gallery__item" style="list-style-type:none">
           <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join('');
}

export { imageGallery };
