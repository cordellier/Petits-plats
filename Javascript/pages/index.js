//**Contrôle de la page d'acceuil */

import { ApiRecipes } from "../Api/ApiRecipes.js";
import { Recipe } from "../Data/data.js";
import { RenderRecipeCard } from "../View/RenderRecipeUI.js";

/*
Exécutée lorsque la page est chargée
*/
document.addEventListener("DOMContentLoaded", function () {
  init();
});

/**
Fonction qui récupère la div contenant toutes les recettes et les affiche
@param {Array} recipes
@param {string} inputText
*/
const RenderRecipes = (recipes, inputText) => {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  if (!Array.isArray(recipes) || recipes.length === 0) {
    recipesContainer.className = "recipes--not-found";
    const recipesNotFoundDOM = document.createElement("p");
    recipesNotFoundDOM.textContent = `Aucune recette ne contient '${inputText}', vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipesContainer.appendChild(recipesNotFoundDOM);
  } else {
    recipesContainer.className = "recipes";
    recipes.forEach((recipe) => {
      recipe = Recipe(recipe);
      const cardDOM = RenderRecipeCard(recipe);
      recipesContainer.appendChild(cardDOM);
    });
  }
};

/**
Fonction appelée lors du chargement, récupère les données de la base de données de recettes
*/
const init = () => {
  const datasRecipes = ApiRecipes();
  const { recipes } = datasRecipes.getRecipes();
  RenderRecipes(recipes);
};

export { RenderRecipes };
