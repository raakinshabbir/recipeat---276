// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    const swiper = swiperContainer.swiper;
    let actionHandled = false; // Track if swipe action was already handled

    // Function to create and return a blank slide element
    function createBlankSlide() {
      const blankSlide = document.createElement('div');
      blankSlide.className = 'swiper-slide blank-slide';
      blankSlide.innerHTML = '<h2>Slide Disliked</h2>'; // Optional content or leave blank
      return blankSlide;
    }

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
          // Show dislike overlay
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';

          setTimeout(() => {
            dislikeOverlay.style.display = 'none'; // Hide overlay
            // Create and insert a blank slide
            const blankSlide = createBlankSlide();
            swiper.appendSlide(blankSlide); // Add the blank slide to the swiper
            swiper.slideNext(); // Move to the next slide after showing the blank slide

            // Remove the previous slide after showing the blank slide
            setTimeout(() => {
              swiper.removeSlide(swiper.previousIndex); // Remove the disliked slide
              actionHandled = false; // Reset action handling
            }, 500); // Adjust the delay as needed
          }, 500);
        }
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
