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
        const activeSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay and remove the previous slide
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            if (swiper.slides.includes(activeSlide)) { // Ensure slide exists before deleting
              swiper.removeSlide(swiper.previousIndex);
            }
            likeOverlay.style.display = 'none'; // Hide overlay after removal
          }, 500);
        } else if (direction === 'left') {
          // Show dislike overlay and remove the previous slide
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            if (swiper.slides.includes(activeSlide)) { // Ensure slide exists before deleting
              swiper.removeSlide(swiper.previousIndex);
            }
            swiper.slideNext(); // Move to the next slide after removal
            dislikeOverlay.style.display = 'none'; // Hide overlay after removal
          }, 500);
        }

        // Update last seen index after processing the current slide
        lastSeenIndex = activeIndex;
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
