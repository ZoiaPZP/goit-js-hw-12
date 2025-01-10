export const elem = {
  galleryDiv: document.querySelector(".gallery"),
  loadMoreBtn: document.querySelector(".load-more"),
  form: document.querySelector(".search-form"),
  input: document.querySelector('.search-form input[name="searchQuery"]'),
};

if (!elem.galleryDiv) console.error("Gallery not found in DOM");
if (!elem.loadMoreBtn) console.error("Load More button not found in DOM");
if (!elem.form) console.error("Form not found in DOM");
if (!elem.input) console.error("Input field not found in DOM");

export function clearGallery() {
  elem.galleryDiv.innerHTML = "";
}

export function renderMarkup(img) {
  elem.galleryDiv.insertAdjacentHTML("beforeend", createMarkup(img));
}

export function createMarkup(img) {
  return img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
          <a href="${largeImageURL}" class="gallery-image">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes: ${likes}</b></p>
            <p class="info-item"><b>Views: ${views}</b></p>
            <p class="info-item"><b>Comments: ${comments}</b></p>
            <p class="info-item"><b>Downloads: ${downloads}</b></p>
          </div>
        </div>
        `;
      }
    )
    .join("");
}