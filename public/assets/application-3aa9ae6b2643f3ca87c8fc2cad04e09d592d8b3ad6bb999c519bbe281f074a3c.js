// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    const swiper = swiperContainer.swiper;
    let lastSeenIndex = 0;
    let actionHandled = false; // Track if swipe action was already handled

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = swiper.activeIndex;
      const direction = activeIndex > lastSeenIndex ? 'right' : 'left';

      // Only process the change if the index has actually changed
      if (activeIndex !== lastSeenIndex && !actionHandled) {
        actionHandled = true; // Set action as handled to prevent duplicate actions
        const activeSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay and remove the previous slide
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            likeOverlay.style.display = 'none'; // Hide overlay
            if (swiper.slides.includes(activeSlide)) {
              swiper.removeSlide(swiper.previousIndex); // Remove the slide after the overlay hides
            }
            actionHandled = false; // Reset action handling after completion
            lastSeenIndex = activeIndex; // Update last seen index after action is handled
          }, 500);
        } else if (direction === 'left') {
          // Show dislike overlay and remove the previous slide
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none'; // Hide overlay
            if (swiper.slides.includes(activeSlide)) {
              swiper.removeSlide(swiper.previousIndex); // Remove the slide after the overlay hides
            }
            swiper.slideNext(); // Move to the next slide after removal
            actionHandled = false; // Reset action handling after completion
            lastSeenIndex = activeIndex; // Update last seen index after action is handled
          }, 500);
        }
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
