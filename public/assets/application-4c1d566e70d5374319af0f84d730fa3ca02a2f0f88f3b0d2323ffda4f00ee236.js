// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    const swiper = swiperContainer.swiper;
    let actionHandled = false; // Track if swipe action was already handled

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = swiper.activeIndex;
      const direction = activeIndex > swiper.previousIndex ? 'right' : 'left';

      // Only process the change if an action hasn't already been handled
      if (activeIndex !== swiper.previousIndex && !actionHandled) {
        actionHandled = true; // Set action as handled
        const previousSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove

        // Variables for overlay
        const likeOverlay = previousSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = previousSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay and remove the previous slide
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            likeOverlay.style.display = 'none'; // Hide overlay
            swiper.removeSlide(swiper.previousIndex); // Remove the previous slide
            actionHandled = false; // Reset action handling
          }, 500);
        } else if (direction === 'left') {
          // Show dislike overlay and remove the previous slide
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none'; // Hide overlay
            swiper.removeSlide(swiper.previousIndex); // Remove the previous slide
            swiper.slideNext(); // Move to the next slide after removal
            actionHandled = false; // Reset action handling
          }, 500);
        }
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
