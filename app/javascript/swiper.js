document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      swipeHandler: true,
      spaceBetween: 50,
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
  