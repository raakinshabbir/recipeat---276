// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    swipeHandler: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    // Enable mouse drag/swipe functionality
    simulateTouch: true,   // Allows swiping with the mouse
    mousewheel: true,      // Optional: Allows scrolling with the mouse wheel
    grabCursor: true,
    on: {
      slideChangeTransitionEnd: function () {
        // Example: Capture swipe left or right
        const direction = swiper.activeIndex > swiper.previousIndex ? 'right' : 'left';
        
        // Perform actions based on swipe direction
        if (direction === 'right') {
          console.log("Liked recipe");
        } else {
          console.log("Disliked recipe");
        }
      }
    }
  });
});
