// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    const swiper = swiperContainer.swiper;

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = swiper.activeIndex;
      const direction = swiper.previousIndex < activeIndex ? 'right' : 'left'; // Determine the swipe direction

      if (swiper.previousIndex !== activeIndex) {
        const activeSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove
        const hasDisliked = activeSlide.dataset.disliked === 'true'; // Check if already disliked

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            likeOverlay.style.display = 'none'; // Hide overlay after displaying
          }, 500); // Duration to show overlay
        } else if (direction === 'left') {
          // Check if the slide has not been disliked yet
          if (!hasDisliked) {
            console.log("Disliked recipe");
            dislikeOverlay.style.display = 'flex';

            // Move to the next slide
            swiper.slideNext(); // Allow the native left swipe animation

            // Mark the slide as disliked
            activeSlide.dataset.disliked = 'true';

            // Remove the previous slide after a short delay
            setTimeout(() => {
              swiper.removeSlide(swiper.previousIndex); // Remove the slide that was just swiped away
              dislikeOverlay.style.display = 'none'; // Hide overlay after removing slide
            }, 500); // Delay for the slide removal
          } else {
            // If already disliked, just move to the next slide
            swiper.slideNext(); // Allow the native left swipe animation
          }
        }
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
