// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";
// swiper js

document.addEventListener("turbo:load", function () {
  const swiperContainer = document.querySelector('swiper-container');
  // console.log(swiperContainer);
  if (swiperContainer) {
    let swiper = swiperContainer.swiper || new Swiper(swiperContainer, {
      direction: "horizontal",
      loop: false,
      slidesPerView: 1,
      navigation: false,
      pagination: false,
      keyboard: {
        enabled: true,
      },
      effect: "cards",
      grabCursor: true, // Optional, enables grabbing cursor for the "cards" effect
      style: {
        "--swiper-navigation-color": "#333",
        "--swiper-pagination-color": "#333",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      },
    });

    if (!swiper) {
      console.error("Swiper instance could not be initialized");
      return;
    }
    let blankSlideAdded = false;
    let lastSeenIndex = 0;
    let loading = false;
    let actionHandled = false; // Track if swipe action was already handled

    if (!blankSlideAdded) {
      const blankSlide = `
        <swiper-slide style="padding: 60px; border: 3px solid #ccc; border-radius: 16px; background-color: #f9f9f9;">
        </swiper-slide>`;
      swiper.prependSlide(blankSlide);
      blankSlideAdded = true;
    }


    // code to listen for swiper reaching end and loading new recipes
    swiper.on("reachEnd", async () => {
      if (loading) return; // Prevent multiple fetches
      loading = true; // Set loading state
    
      console.log("Reached the last slide - fetching more recipes...");
      try {
        const response = await fetch("/load_more_recipes");
        if (response.ok) {
          const newRecipes = await response.json(); // Get the new recipes from the response
          
          newRecipes.forEach(recipe => {
            // Create a new slide element for each recipe using ERB structure
            const newSlide = document.createElement('swiper-slide');
            newSlide.style.padding = '60px';
            newSlide.style.border = '3px solid #ccc';
            newSlide.style.borderRadius = '16px';
            newSlide.style.backgroundColor = '#f9f9f9';
            newSlide.setAttribute('data-recipe-id', recipe.id); 
    
            newSlide.innerHTML = `
              <h2 style="color: #2c3e50;">${recipe.title}</h2>
              <div style="text-align: center;">
                <img src="${recipe.image_url}" alt="${recipe.title}" style="width: 100%; max-width: 500px; border-radius: 12px; margin-bottom: 20px;">
              </div>
              <div style="margin-top: 10px;">
                <strong>Ingredients:</strong>
                <p style="font-size: 14px; color: #555;">${recipe.ingredients}</p>
                <strong>Instructions:</strong>
                <div style="font-size: 14px; color: #555;">
                  ${recipe.instructions.split('.').map(line => `<p>${line.trim()}</p>`).join('')}
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                  <div style="text-align: left;">
                    <strong>Cooking Time:</strong>
                    <p>${recipe.cooking_time}</p>
                  </div>
                  <div style="text-align: center;">
                    <strong>Servings:</strong>
                    <p>${recipe.servings}</p>
                  </div>
                  <div style="text-align: right;">
                    <strong>Difficulty:</strong>
                    <p>${recipe.difficulty}</p>
                  </div>
                </div>
              </div>
              <div class="feedback-overlay like">✅</div>
              <div class="feedback-overlay dislike">❌</div>
            `;
    
            swiper.appendSlide(newSlide); // Add the new slide to the swiper
          });
        } else {
          console.error("Failed to fetch new recipes", response.statusText);
        }
      } catch (error) {
        console.error("Failed to load more recipes", error);
      } finally {
        loading = false; // Reset loading state
      }
    });
    
    //listener for the overlay of swiper change
    swiperContainer.addEventListener('swiperslidechange', (event) => {
      //console.log("Swiper slide change detected"); // Debugging statement
      const activeIndex = swiper.activeIndex;
      const previousIndex = swiper.previousIndex;
      const direction = activeIndex > lastSeenIndex ? 'right' : 'left';

      if (activeIndex !== previousIndex && !actionHandled) {
        actionHandled = true; // Set action as handled
        const activeSlide = swiper.slides[swiper.previousIndex]; // Get the slide to remove

        // Variables for overlay
        const likeOverlay = activeSlide.querySelector('.feedback-overlay.like');
        const dislikeOverlay = activeSlide.querySelector('.feedback-overlay.dislike');

        if (direction === 'right') {
          console.log("Swiped right on recipe");
          const recipeId = activeSlide.getAttribute('data-recipe-id');

          fetch(`/recipes/${recipeId}/liked`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          }).then(response => {
            console.log("Response status:", response.status); // Debug line
            return response.json().catch(e => {
              console.error("JSON parse error:", e);
              return { status: 'error', message: e.toString() };
            });
          }).then(data => {
              if (data.message === 'Recipe liked successfully') {
                console.log("Recipe saved successfully");
              } else {
                console.error("Failed to save recipe. Server response: ", data);
              }
            });
          
          // Show like overlay and remove the previous slide
          console.log("Liked recipe");
          likeOverlay.style.display = 'flex';
          
          setTimeout(() => {
            likeOverlay.style.display = 'none'; // Hide overlay
            swiper.removeSlide(previousIndex); // Remove the slide after the overlay hides
        
            actionHandled = false; // Reset action handling
          }, 300);
        
        } else if (direction === 'left') {
          // Show dislike overlay and remove the previous slide
          console.log("Disliked recipe");
          dislikeOverlay.style.display = 'flex';
          setTimeout(() => {
            dislikeOverlay.style.display = 'none'; // Hide overlay
            swiper.removeSlide(previousIndex); // Remove the slide after the overlay hides
            swiper.slideNext(); // Move to the next slide after removal
            actionHandled = false; // Reset action handling
          }, 300);
        }
      }
    });


  } else {
    console.log("Swiper container not found");
  }
});
