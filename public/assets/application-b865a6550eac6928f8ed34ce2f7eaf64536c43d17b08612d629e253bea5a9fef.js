// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    let lastSeenIndex = swiperContainer.swiper.activeIndex;

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const swiper = swiperContainer.swiper;
      const direction = swiper.activeIndex > swiper.previousIndex ? 'right' : 'left';
      const activeSlide = swiper.slides[swiper.activeIndex];

      // Variables for overlay
      const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
      const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

      // Prevent going back to a previous recipe if the user has moved forward
      if (swiper.activeIndex > lastSeenIndex) {
        // If swiped right (liked)
        if (direction === 'right') {
          swiper.slideNext();
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            likeOverlay.style.display = 'none';
          }, 500); // Hide after 0.5 seconds
          lastSeenIndex = swiper.activeIndex; // Update last seen index
        } else if (direction === 'left') {
          swiper.slideNext();
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none';
          }, 500); // Hide after 0.5 seconds
          // Note: lastSeenIndex remains the same since the user is just disliking
        }
      } else if (swiper.activeIndex < lastSeenIndex) {
        // If the user tries to swipe back to a previous recipe, reset to lastSeenIndex
        swiper.slideTo(lastSeenIndex);
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
