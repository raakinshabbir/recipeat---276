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

      // Only process the change if the index has actually changed
      if (activeIndex !== lastSeenIndex) {
        const activeSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay and remove the previous slide
          lastSeenIndex = activeIndex; // Update last seen index
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            swiper.removeSlide(swiper.previousIndex); // Remove the slide that was just swiped away
            likeOverlay.style.display = 'none'; // Hide overlay after removing slide
          }, 500); // Delay for the slide removal
        } else if (direction === 'left') {
          // Show dislike overlay and remove the previous slide
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            swiper.removeSlide(swiper.previousIndex); // Remove the slide that was just swiped away
            dislikeOverlay.style.display = 'none'; // Hide overlay after removing slide
          }, 500); // Delay for the slide removal

      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
