//**CONTROLE DE LA PAGE D'ACCEUIL */

import { ApiRecipes } from "../Api/ApiRecipes.js";
import { RenderRecipeCard } from "../View/renderRecipeUI.js";
import { DisplayFilterDOM } from "../View/renderFilterUI.js";
import { manageFilters } from "../utils/Filters.js";
import { manageSearch, updateFilters } from "../utils/SearchInput.js";
import { manageCaracter } from "../utils/aideBalise.js";
import { filtersQueries } from "../utils/filterQueries.js";

/*
Exécutée lorsque la page est chargée
*/
document.addEventListener("DOMContentLoaded", function () {
  init();
});

/**
Fonction qui récupère la div contenant toutes les recettes et les affichent
@param {Array} recipes - Liste des recettes à afficher
@param {string} inputText - Texte de recherche saisi par l'utilisateur
*/
const renderRecipes = (recipes, inputText) => {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  if (!Array.isArray(recipes) || recipes.length === 0) {
    recipesContainer.className = "recipes--not-found";
    const recipesNotFoundDOM = document.createElement("p");
    recipesNotFoundDOM.textContent = `Aucune recette ne contient '${inputText}', vous pouvez chercher « Tartellettes au chocolat et aux fraises », « poulet », etc.`;
    recipesContainer.appendChild(recipesNotFoundDOM);
  } else {
    recipesContainer.className = "recipes";
    recipes.forEach((recipe) => {
      const cardDOM = RenderRecipeCard(recipe);
      recipesContainer.appendChild(cardDOM);
    });
  }
};

const handleInputSearch = (event, allRecipes) => {
  let inputText = event.target.value;
  inputText = manageCaracter(inputText);
  const filterEmpty = document.getElementById(`empty-filter-header-search`);
  filterEmpty.classList.add("empty-input-button--typing");
  if (inputText.length === 0) {
    filterEmpty.classList.remove("empty-input-button--typing");
  }
  if (inputText.length < 3) {
    updateFilters(allRecipes, allRecipes);
  }
  if (inputText.length >= 3) {
    const filterBy = ["name", "ingredients", "description"];
    const filteredRecipesBySearch = filtersQueries(
      allRecipes,
      inputText,
      filterBy
    );
    updateFilters(allRecipes, filteredRecipesBySearch, inputText);
  }
};

const initSearchBar = (allRecipes) => {
  const filterInput = document.getElementById("header-search");
  const filterEmpty = document.getElementById(`empty-filter-header-search`);
  // Événement de saisie
  filterInput.addEventListener("input", (event) => {
    handleInputSearch(event, allRecipes);
    // Vide l'entrée lorsqu'on clique sur la croix
    filterEmpty.addEventListener("click", () => {
      filterInput.value = "";
      filterEmpty.classList.remove("empty-input-button--typing");
      updateFilters(allRecipes, allRecipes);
    });
  });
};

/**
 * Fonction qui renomme le titre d'un filtre en fonction de son type
 * @param {string} nameOfFilter - Le type de filtre à renommer
 * @returns {Object|string} - Objet contenant le nom du filtre et son placeholder, ou une chaîne vide si le type de filtre n'est pas reconnu
 */
const renameTitle = (nameOfFilter) => {
  switch (nameOfFilter) {
    case "ingredients":
      return {
        filter: nameOfFilter,
        placeHolder: "Ingrédients",
      };
    case "appliances":
      return {
        filter: nameOfFilter,
        placeHolder: "Appareils",
      };
    case "ustensils":
      return {
        filter: nameOfFilter,
        placeHolder: "Ustensiles",
      };
    default:
      return "";
  }
};

/**
 * Affiche tous les filtres dans le DOM
 * @param {Array} recipes - Tableau de recettes
 */
const displayAllFilters = (recipes) => {
  const filtersContainer = document.querySelector(".filters__container");
  const filters = ["ingredients", "appliances", "ustensils"];
  filters
    .map((item) => renameTitle(item))
    .forEach((filter) => {
      const filterDOM = DisplayFilterDOM(filter);
      filtersContainer.appendChild(filterDOM);
    });
  manageFilters(recipes);
};

/**
Afficher le nombre total de recettes trouvées
@param {Array} recettes
*/
const renderTotalRecipes = (recipes) => {
  const TotalRecipesDOM = document.querySelector(".filters__total-recipes");
  const TotalRecipes = recipes.length;
  if (TotalRecipes < 10) {
    TotalRecipesDOM.textContent = `0${TotalRecipes} recettes`;
  } else if (TotalRecipes <= 1) {
    TotalRecipesDOM.textContent = `0${TotalRecipes} recette`;
  } else {
    TotalRecipesDOM.textContent = `${TotalRecipes} recettes`;
  }
};

/**
Fonction appelée lors du chargement, récupère les données de la base de données de recettes
*/
const init = () => {
  const datasRecipes = ApiRecipes();
  const { recipes } = datasRecipes.getRecipes();
  renderRecipes(recipes);
  displayAllFilters(recipes);
  manageSearch(recipes, recipes);
  renderTotalRecipes(recipes);
  initSearchBar(recipes);
};

export { renderRecipes, renderTotalRecipes };
