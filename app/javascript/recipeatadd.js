const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to display recipes
function displayRecipes() {
    fetch('/recipes')
        .then(response => response.json())
        .then (data => {
            const recipeList = document.getElementById('recipe-list');
            recipeList.innerHTML = ''; // Clear existing recipes

            data.forEach((recipe, index) => {
                const item = document.createElement('div');
                item.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <p>${recipe.origin}</p>
                    <p>${recipe.steps}</p>
                    <img src="${recipe.photo}" alt="${recipe.name}" style="display: block; margin: 0 auto; max-width: 100%;">
                    <button onclick="deleteRecipe(${index})">Delete</button>
                    `;
                recipeList.appendChild(item);
            });
        })
        .catch(error => console.error('Error:', error));
}


// Function to add a new recipe
document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('recipe-name').value;
    const description = document.getElementById('recipe-description').value;
    const origin = document.getElementById('recipe-origin').value;
    const steps = document.getElementById('recipe-steps').value;
    const photo = document.getElementById('recipe-photo').files[0];

    if (!name || !description || !steps || !origin) {
        alert('Please fill all required fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        fetch('/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
                recipe: {
                    name,
                    description,
                    origin,
                    steps,
                    photo: event.target.result
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            displayRecipes();
        })
        .catch(error => console.error('Error:', error));
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