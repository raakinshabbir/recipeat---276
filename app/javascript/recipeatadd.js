const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to display recipes
function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing recipes

    recipes.forEach((recipe, index) => {
        const item = document.createElement('div');
        item.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Instructions: ${recipe.instructions}</p>
            <p>Cooking Time: ${recipe.cooking_time} minutes</p>
            <p>Servings: ${recipe.servings}</p>
            <p>Difficulty: ${recipe.difficulty}</p>
            <img src="${recipe.photo}" alt="${recipe.title}" style="display: block; margin: 0 auto; max-width: 100%;">
            <button onclick="deleteRecipe(${index})">Delete</button>
            `;
        recipeList.appendChild(item);
    });
}

// Function to add a new recipe
document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;
    const cookingTime = document.getElementById('recipe-cooking-time').value;
    const servings = document.getElementById('recipe-servings').value;
    const difficulty = document.getElementById('recipe-difficulty').value;
    const photo = document.getElementById('recipe-photo').files[0];

    if (!title || !ingredients || !instructions || !cookingTime || !servings || !difficulty) {
        alert('Please fill all required fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const recipe = {
            title,
            ingredients,
            instructions,
            cooking_time: cookingTime,
            servings,
            difficulty,
            photo: event.target.result // Save the image as a data URL
        };

        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes)); // Save to localStorage
        displayRecipes(); // Update the displayed recipes
    };
    reader.readAsDataURL(photo);
});

// Load recipes from localStorage on page load
window.onload = function() {
    displayRecipes();
};

// Optional: Preview image before adding
document.getElementById('recipe-photo').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Remove any existing preview
            const existingPreview = document.getElementById('image-preview');
            if (existingPreview) {
                existingPreview.remove();
            }

            const imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;
            imagePreview.id = 'image-preview';
            imagePreview.style.display = 'block';
            imagePreview.style.margin = '10px auto';
            imagePreview.style.maxWidth = '100%';
            document.body.insertBefore(imagePreview, document.getElementById('recipe-form').nextSibling);
        };
        reader.readAsDataURL(file);
    }
});

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}