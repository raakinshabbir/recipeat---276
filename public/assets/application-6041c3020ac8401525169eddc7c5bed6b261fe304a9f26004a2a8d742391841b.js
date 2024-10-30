// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    const swiper = swiperContainer.swiper;
    let lastSeenIndex = 0;

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = swiper.activeIndex;
      const direction = activeIndex > lastSeenIndex ? 'right' : 'left';

      if (activeIndex !== lastSeenIndex) {
        const activeSlide = swiper.slides[activeIndex];

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay, then remove the slide after a short delay
          lastSeenIndex = activeIndex; // Update last seen index
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            swiper.removeSlide(activeIndex); // Remove current slide after showing overlay
            likeOverlay.style.display = 'none'; // Hide overlay after removing slide
          }, 250); // Delay for the slide removal
        } else if (direction === 'left') {
          // Show dislike overlay, then remove the slide after a short delay
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            swiper.removeSlide(activeIndex); // Remove current slide after showing overlay
            dislikeOverlay.style.display = 'none'; // Hide overlay after removing slide
          }, 250); // Delay for the slide removal
        }
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
