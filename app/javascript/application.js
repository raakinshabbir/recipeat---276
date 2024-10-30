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

    swiper.on("reachEnd", async () => {
      console.log("Reached the last slide - fetching more recipes...");
      try {
        // Trigger a server endpoint to load more recipes
        await fetch("/load_more_recipes");
        // Optionally, reinitialize or reload swiper with new slides
        swiper.update();
      } catch (error) {
        console.error("Failed to load more recipes", error);
      }
    });

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = swiper.activeIndex;
      const direction = activeIndex > lastSeenIndex ? 'right' : 'left';

      if (activeIndex !== lastSeenIndex && !actionHandled) {
        actionHandled = true; // Set action as handled
        const activeSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          // Show like overlay and remove the previous slide
          lastSeenIndex = activeIndex
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          setTimeout(() => {
            likeOverlay.style.display = 'none'; // Hide overlay
            swiper.removeSlide(swiper.previousIndex); // Remove the slide after the overlay hides
            actionHandled = false; // Reset action handling
          }, 500);
        } else if (direction === 'left') {
          // Show dislike overlay and remove the previous slide
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none'; // Hide overlay
            swiper.removeSlide(swiper.previousIndex); // Remove the slide after the overlay hides
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
