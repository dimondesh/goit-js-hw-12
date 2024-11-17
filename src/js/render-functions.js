export function renderGallery(images) {
  return images
    .map(({ webformatURL, largeImageURL, tags }) => {
      return `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
    `;
    })
    .join('');
}
