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
        const previousIndex = swiper.previousIndex;

        // Get the recipe ID from the active slide
        const recipeId = activeSlide.getAttribute('data-recipe-id');

        // variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';

          // Send a request to like the recipe
          fetch(`/swipe_right/${recipeID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Include CSRF token
            },
            body: JSON.stringify({
              recipe_id: recipeId
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log("Recipe liked successfully:", data);
          })
          .catch(error => {
            console.error("Error liking recipe:", error);
          });

          setTimeout(() => {
            likeOverlay.style.display = 'none';
          }, 500); // Hide after 1 second
        } else if (direction === 'left') {
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none';
          }, 500); // Hide after 1 second
        }

        lastIndex = swiper.activeIndex;
      }
    });
  } else {
    console.log("Swiper container not found");
  }
});
