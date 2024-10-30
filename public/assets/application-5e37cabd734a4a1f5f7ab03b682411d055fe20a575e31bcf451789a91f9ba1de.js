// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

//swiper js
document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');

  if (swiperContainer) {
    let swiper = new Swiper(swiperContainer, {
      // Swiper configuration
      on: {
        slideChangeTransitionEnd: function () {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const recipeId = activeSlide.getAttribute('data-recipe-id');

          // Hide overlays initially
          activeSlide.querySelector('.feedback-overlay.like').style.display = 'none';
          activeSlide.querySelector('.feedback-overlay.dislike').style.display = 'none';
        }
      }
    });

    // Handle swiping
    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const swiper = swiperContainer.swiper;
      const direction = swiper.activeIndex > swiper.previousIndex ? 'right' : 'left';

      const activeSlide = swiper.slides[swiper.activeIndex];
      const recipeId = activeSlide.getAttribute('data-recipe-id');

      if (direction === 'right') {
        console.log("Liked recipe: " + recipeId);
        // Send like action to your backend here

        // Optionally show liked overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        likeOverlay.style.display = 'flex';
      } else if (direction === 'left') {
        console.log("Disliked recipe: " + recipeId);
        // Send dislike action to your backend here

        // Optionally show disliked overlay
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');
        dislikeOverlay.style.display = 'flex';
      }

      // Remove the current slide from the DOM after the transition
      setTimeout(() => {
        activeSlide.remove(); // This removes the slide from DOM
      }, 300); // Adjust timeout to match the CSS transition duration
    });
  } else {
    console.log("Swiper container not found");
  }
});


