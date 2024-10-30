// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    let lastIndex = swiperContainer.swiper.activeIndex;

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const swiper = swiperContainer.swiper;
      const direction = swiper.activeIndex > swiper.previousIndex ? 'right' : 'left';

      if (swiper.activeIndex !== lastIndex) {
        const activeSlide = swiper.slides[swiper.activeIndex];

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            likeOverlay.style.display = 'none';
            swiper.slideNext()
          }, 500); // Hide after 0.5 seconds
        } else if (direction === 'left') {
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none';
            swiper.slideNext()
          }, 500); // Hide after 0.5 seconds
        }

        lastIndex = swiper.activeIndex;
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
