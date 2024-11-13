// liked.js

document.addEventListener('turbo:load', () => {
  // Initialize unlike button listeners
  initializeUnlikeButtons();
});

function initializeUnlikeButtons() {
  document.querySelectorAll('.unlike-button').forEach(button => {
    button.addEventListener('click', handleUnlike);
  });
}

function handleUnlike(event) {
  event.preventDefault();
  const recipeId = event.target.dataset.recipeId;
  const recipeCard = event.target.closest('li'); // Find the parent recipe card

  fetch(`/recipes/${recipeId}/liked`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Recipe unliked successfully') {
      // Animate and remove the recipe card
      recipeCard.style.transition = 'opacity 0.3s ease';
      recipeCard.style.opacity = '0';
      setTimeout(() => {
        recipeCard.remove();
        // Show "No recipes" message if list is empty
        if (document.querySelectorAll('#recipes li').length === 0) {
          document.getElementById('recipes').innerHTML = 
            '<li class="recipe-card">No liked recipes yet!</li>';
        }
      }, 300);
    }
  })
  .catch(error => console.error('Error:', error));
}