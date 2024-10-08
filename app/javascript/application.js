// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";


document.addEventListener("DOMContentLoaded", function () {


  const swiperContainer = document.querySelector('swiper-container');
  
  if (swiperContainer) {
    console.log("Swiper container found");
    
    
    swiperContainer.addEventListener('swiperslidechange', (event) =>{
      const swiper = swiperContainer.swiper
      const direction = swiper.activeIndex > swiper.previousIndex ? 'right' : 'left';
      
      if (direction === 'right') {
        console.log("Liked recipe");
      } else {
        console.log("Disliked recipe");
      }
    });
  } else {
    console.log("Swiper container not found");
  }
  swiperContainer.addEventListener('transitionend', function (event) {
    console.log("Slide transition ended");
  });
});


