//**Gestion des cartes de recettes */

// Fonction pour rendre la liste des ingrédients
const renderIngredients = (ingredients) => {
  return (
    ingredients &&
    ingredients
      .map(
        (ingredient) => `    
  <li class="flex-col">
    <span class="recipe-card__ingredient">${ingredient.ingredient}</span>
    <span class="recipe-card__ingredient-quantity">${
      ingredient.quantity ? ingredient.quantity : ""
    } ${ingredient.unit ? ingredient.unit : ""}</span>
  </li>`
      )
      .join("")
  );
};

/**
 * Fonction pour créer un article affichant la carte de recette
 * @param {object} recipe - L'objet de recette contenant des détails tels que le nom, l'image, le temps, la description et les ingrédients
 * @returns {html} - L'élément HTML de l'article représentant la carte de recette
 */
const RenderRecipeCard = (recipe) => {
  // article container
  const article = document.createElement("article");
  article.className = "recipe-card flex-col";
  const src = `assets/photos/${recipe.image}`;
  const recipeCard = `
      <img src=${src} alt="${recipe.name}" height="253" width="380">

      <div class="recipe-card__duration">${recipe.time}min</div>

      <div class="recipe-card__content flex-col">
          <h2 class="recipe-card__title">${recipe.name}</h2>
          
          <section class="recipe-card__content-section flex-col">
              <h3 class="recipe-card__subtitle">Recette</h3>
              <p class="recipe-card__instruction">
              ${recipe.description}
              </p>
          </section>

          <section class="recipe-card__content-section flex-col">
              <h3 class="recipe-card__subtitle">Ingrédients</h3>
              <ul class="recipe-card__ingredients-list">
              ${renderIngredients(recipe.ingredients)}
              </ul>
          </section>
      </div>
        `;

  article.innerHTML = recipeCard;

  return article;
};

export { RenderRecipeCard };
