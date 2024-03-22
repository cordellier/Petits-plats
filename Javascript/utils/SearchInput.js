import { renderRecipes, renderTotalRecipes } from "../pages/index.js";
import { filtersQueries } from "./filterQueries.js";
import { manageFilters } from "./filters.js";
import { manageCaracter } from "./aideBalise.js";

/**
 * Gère la saisie lorsque l'utilisateur tape et permet d'affiche la croix et les recettes correspondantes uniquement après avoir tapé 3 caractères
 * @param {Array} allRecipes - La liste de toutes les recettes disponibles sur votre site.
 * @param {Array} filteredRecipes -  La liste des recettes déjà filtrées selon d'autres critères.
 */
const manageSearch = (allRecipes, filteredRecipes) => {
  const filterInput = document.getElementById("header-search");
  const filterEmpty = document.getElementById(`empty-filter-header-search`);
  // Événement de saisie
  filterInput.addEventListener("input", (event) => {
    let inputText = event.target.value;
    inputText = manageCaracter(inputText);
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
        filteredRecipes,
        inputText,
        filterBy
      );
      updateFilters(allRecipes, filteredRecipesBySearch, inputText);
    }
    // Vide l'entrée lorsqu'on clique sur la croix
    filterEmpty.addEventListener("click", () => {
      filterInput.value = "";
      filterEmpty.classList.remove("empty-input-button--typing");
      updateFilters(allRecipes, allRecipes);
    });
  });
};

/**
 * Régénère la vue des recettes avec les filtres appropriés
 * @param {Array} originalList
 * @param {Array} filteredList
 * @param {string} inputText
 */
const updateFilters = (originalList, filteredList, inputText) => {
  renderRecipes(filteredList, inputText);
  // Gère les filtres avancés
  manageFilters(originalList, filteredList);
  renderTotalRecipes(filteredList);
};

export { manageSearch, updateFilters };
