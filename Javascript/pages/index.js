//**CONTROLE DE LA PAGE D'ACCEUIL */

import { ApiRecipes } from "../Api/ApiRecipes.js";
import { Recipe } from "../Data/data.js";
import { RenderRecipeCard } from "../View/RenderRecipeUI.js";
import { displaySingleFilter } from "../View/RenderFilterUI.js";

/*
Exécutée lorsque la page est chargée
*/
document.addEventListener("DOMContentLoaded", function () {
  init();
});

/**
Fonction qui récupère la div contenant toutes les recettes et les affichent
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
 * Affiche tous les filtres dans le DOM
 * @param {Array} recipes - Tableau de recettes
 */
const displayAllFilters = (recipes) => {
  const filtersContainer = document.querySelector(".filters__container");
  const filters = ["ingredients", "appliances", "ustensils"];
  filters.forEach((filter) => {
    const filterDOM = displaySingleFilter(filter);
    filtersContainer.appendChild(filterDOM);
  });
  manageFilters(recipes, recipes);
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
export { displayAllFilters as displayFilter };
