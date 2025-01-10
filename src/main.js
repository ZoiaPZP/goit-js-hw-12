import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.1.0.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "./css/common.css";
import "./css/styles.css";
import { service } from "./js/pixabay-api.js";
import { elem, renderMarkup, clearGallery } from "./js/render-functions.js";

let page = 1;
const perPage = 40;

const loadingIndicator = document.getElementById("loading-indicator");
const showLoadingSpinner = () => (loadingIndicator.style.display = "block");
const hideLoadingSpinner = () => (loadingIndicator.style.display = "none");

const hideLoadMoreBtn = () => elem?.loadMoreBtn?.classList.add("load-more-hidden");
const showLoadMoreBtn = () => elem?.loadMoreBtn?.classList.remove("load-more-hidden");

hideLoadMoreBtn();

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 200,
});

document.addEventListener("DOMContentLoaded", () => {
  Notiflix.Notify.init({
    position: "right-bottom",
    clickToClose: true,
    timeout: 3000,
  });
});

async function submit(evt) {
  evt.preventDefault();
  const text = elem.input.value.trim();
  if (!text) {
    hideLoadMoreBtn();
    Notiflix.Notify.failure("Please enter a search query.");
    return;
  }

  page = 1;
  clearGallery();
  showLoadingSpinner();

  // Показуємо повідомлення про завантаження
  Notiflix.Notify.info("Loading images, please wait.");

  try {
    const galleryItems = await service(text, page, perPage);
    if (!galleryItems?.data?.hits?.length) {
      iziToast.error({ title: "Error", message: "No images found." });
      return;
    }

    const totalHits = galleryItems.data.totalHits;
    totalHits > perPage ? showLoadMoreBtn() : hideLoadMoreBtn();

    Notiflix.Notify.success(`Success! Found ${totalHits} images.`);
renderMarkup(galleryItems.data.hits);
lightbox.refresh();


  } catch (error) {
    Notiflix.Notify.failure("An error occurred. Please try again.");
  } finally {
    hideLoadingSpinner();
  }
}

async function onClickBtn() {
  page += 1;
  const text = elem.input.value.trim();
  showLoadingSpinner();

  // Показуємо повідомлення про завантаження
  Notiflix.Notify.info("Loading more images, please wait.");

  try {
    const galleryItems = await service(text, page, perPage);
    if (!galleryItems?.data?.hits?.length) {
      hideLoadMoreBtn();
      Notiflix.Notify.failure("No more results.");
      return;
    }

    renderMarkup(galleryItems.data.hits);
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure("An error occurred while loading more images.");
  } finally {
    hideLoadingSpinner();
  }
}

if (elem?.form) elem.form.addEventListener("submit", submit);
if (elem?.loadMoreBtn) elem.loadMoreBtn.addEventListener("click", onClickBtn);























